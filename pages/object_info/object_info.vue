<template>
	<view id="OBJECT_INFO">
		<scroll-view scroll-y class="info_box" :style="'height:'+height+'px'">
			<uni-collapse :accordion="true" class="object_box">
				<uni-collapse-item v-for="(item,index) in objectList" :key="index" :thumb="item.stateImage" :show-animation="true" :title="item.Name">
					<view class="info_item_box">
						<view class="info_item">
							<view class="info_item_left">颜色：{{item.ColorName}}</view>
							<view class="info_item_right">单价：{{item.InitialPrice}}</view>
						</view>
						<view class="info_item">
							<view class="info_item_left">附加费：{{item.AttachPrice.toFixed(2)}}元</view>
							<view class="info_item_right">档次：{{item.levelName}}</view>
						</view>
						<view class="info_item">
							<view class="info_item_left">快慢：{{item.ServiceTimeName}}</view>
							<view class="info_item_right">状态：{{item.iState}}</view>
						</view>
						<view class="info_text">附加服务：{{item.AttachName}}</view>
						<view class="info_text">瑕疵：{{item.flawName}}</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>
		<system></system>
	</view>
</template>

<script>
import uniCollapse from '@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue'
export default {
	components: {
		uniCollapse,
		uniCollapseItem,
	},
	data() {
		return {
			height: 0,
			orderNo: '',
			objectList:[]
		}
	},
	onLoad: function (options) {
		this.checkLogin('../Laundry_order/Laundry_order',1);
		this.height = uni.getSystemInfoSync().windowHeight;
		this.orderNo = options.orderNo
		this.$showLoading();
		this.getData(options.orderNo);
	},
	onPullDownRefresh: function () {
		this.getData(this.orderNo);
	},
	methods: {
		getData: function (orderNo) {
			uni.request({
				url: this.apiServer + 'orderServer/orderManagement/getOrderArticle',
				method: 'POST',
				data: {
					OpenId: uni.getStorageSync("openid"),
					orderNumber: orderNo
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							if(!data[i].AttachPrice){
								data[i].AttachPrice = 0;
							};
							if(!data[i].levelName){
								data[i].levelName = '';
							};
							switch (data[i].iState){
								case '已收件':
									data[i].stateImage = '../../static/object/u6539.png';
									break;
								case '已送洗':
									data[i].stateImage = '../../static/object/u6547.png';
									break;
								case '已上挂':
									data[i].stateImage = '../../static/object/u6543.png';
									break;
								case '已取走':
									data[i].stateImage = '../../static/object/u6560.png';
									break;
							}
						};
						this.objectList = data;
						console.log(data);
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					};
				},
				fail: () => {
					uni.showToast({
						title: '网络请求失败',
						duration: 2000,
						icon: "none"
					});
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		}
	}
}
</script>

<style scoped>
.info_box{
	background-color: #F4F4F4;
}
.info_item_box{
	background-color: white;
}
.info_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.9em;
}
.info_item:first-of-type{
	border-top: 1px solid #E3E3E3;
}
.info_item:last-of-type{
	border-bottom: 0px;
}
.info_item_left,
.info_item_right{
	border: 1px solid #E3E3E3;
	border-top: 0px;
	width: 50%;
	padding: 6px 0px 6px 5px;
}
.info_item_right{
	border-left: 0px;
}
.info_text{
	padding: 6px 0px 6px 5px;
	font-size: 0.9em;
	border-bottom: 1px solid #E3E3E3;
}
.info_text:last-of-type{
	border-bottom: 0px;
}
</style>
