<template>
	<view id="CONPON">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#F4A62F"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0" class="select_item" :style="'height:'+height+'px'">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="coupon_box" v-for="(item,index) in couponListXY" :key="index">
						<view class="coupon_img">
							<image :src="item.ticketImage"></image>
						</view>
						<view class="coupon_text_box">
							<view class="coupon_text">
								<view class="coupon_text_title">
									<view class="title_money">￥
										<text class="title_num">{{item.tmoney}}</text>
										<view class="title_condition">{{item.name}}</view>
									</view>
								</view>
								<view class="coupon_text_description">{{item.tickeDescription}}</view>
								<view class="coupon_text_time">有效期至：{{item.endTime}}</view>
							</view>
						</view>
						<view class="coupon_button" :class="item.state=='立即使用'?'unused':'used'" @click="useCoupon(item)">
							<view class="coupon_button_text">{{item.state}}</view>
							<view class="coupon_button_item"></view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 1" class="select_item" :style="'height:'+height+'px'">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="coupon_box" v-for="(item,index) in couponListSC" :key="index">
						<view class="coupon_img">
							<image :src="item.ticketImage"></image>
						</view>
						<view class="coupon_text_box">
							<view class="coupon_text">
								<view class="coupon_text_title">
									<view class="title_money">￥
										<text class="title_num">30</text>
										<view class="title_condition">满100可用</view>
									</view>
								</view>
								<view class="coupon_text_description">
									<view>洗衣七折券，最高折扣30元。</view>
									<view>此券不可拆分，仅限一次使用。</view>
								</view>
								<view class="coupon_text_time">有效期至：{{item.endTime}}</view>
							</view>
						</view>
						<view class="coupon_button" :class="item.state=='立即使用'?'unused':'used'" @click="useCoupon(item)">
							<view class="coupon_button_text">{{item.state}}</view>
							<view class="coupon_button_item"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
export default {
	components: {
		uniSegmentedControl
	},
	data() {
		return {
			items: ['洗衣优惠券','商城优惠券'],
			current: 0,
			height: 0,
			couponListXY: [],
			couponListSC: [],
			pageType: ""
		}
	},
	onLoad: function (options) {
		let opid = this.checkLogin('../coupon/coupon',1);
		this.height = uni.getSystemInfoSync().windowHeight - 43;
		this.pageType = options.type;
		if(!!opid){
			this.$showLoading();
			this.getDataXY();
		};
	},
	onNavigationBarButtonTap: function () {
		uni.switchTab({url:"../my/my"});
	},
	methods: {
		formatDate: function (now) {
			let year=now.getFullYear();
			let month=now.getMonth()+1;
			let date=now.getDate();
			if(month<10){
			month = '0' + month;
			};
			if(date<10){
			date = '0' + date;
			};
			return year+"-"+month+"-"+date
		},
		onClickItem: function (index) {
			if (this.current !== index) {
				if(index == 0){
					this.getDataXY();
				}else{
					this.getDataSC();
				}
				this.current = index;
			}
		},
		getDataXY: function () {
			uni.request({
				url: this.apiServer + 'userServer/consumerManage/getConsumerCoupon',
				method: 'POST',
				data: {
					OpenId: uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							let time = this.formatDate(new Date(data[i].endTime));
							data[i].endTime = time;
							if(!(!!data[i].ticketImage) || data[i].ticketImage==" "){
								data[i].ticketImage = '../../static/coupon/u2274.png'
							}
						}
						this.couponListXY = data;
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					this.reconnect('../coupon/coupon',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			});
		},
		getDataSC: function () {
			// uni.request({
			// 	
			// });
		},
		useCoupon: function (data) {
			if(data.state == '立即使用'){
				if(this.pageType == 'my'){
					if(this.current == 0){
						// 跳转预约单支付页面
					}else{
						// 跳转商城页面
					};
				}else{
					if(this.current == 0){
						// 预约单支付页面使用优惠券
					}else{
						// 商城支付页面使用优惠券
					};
				};
			};
		}
	}
}
</script>

<style scoped>
.select_item{
	background-color: #F4F4F4;
	padding: 10px;
	padding-bottom: 0px;
}
.coupon_box{
	margin-bottom: 10px;
	background-color: white;
	display: flex;
}
.coupon_img{
	width: 30%;
	height: 0;
	padding-bottom: 28%;
	position: relative;
}
.coupon_img image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.coupon_text_box{
	width: calc(100% - 30% - 25px);
	padding-left: 5px;
}
.coupon_text{
	width: 90%;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}
.coupon_text_title{
	display: flex;
	color: #FE0302;
}
.title_num{
	font-size: 1.3em;
}
.title_condition{
	font-size: 0.7em;
	margin-left: 6px;
	display: inline-block;
	background-color: #FEEFF2;
}
.coupon_text_description{
	font-size: 0.6em;
}
.coupon_text_time{
	font-size: 0.7em;
	color: #656565;
}
.coupon_button{
	width: 25px;
	display: flex;
	font-weight: bold;
	font-size: 0.8em;
}
.coupon_button_text{
	text-align: center;
	vertical-align: middle;
	margin: auto;
}
.coupon_button_item{
	width: 0px;
	height: 100%;
	vertical-align: middle;
}
.unused{
	background-color: #FE0302;
	color: white;
}
.used{
	background-color: #CBCBCB;
	color: white;
}
</style>
