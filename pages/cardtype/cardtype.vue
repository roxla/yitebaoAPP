<template>
	<view id="CARDTYPE">
		<scroll-view scroll-y :style="'height:'+height+'px'">
			<view class="cardtype_box">
				<view class="cardtype_img">
					<image :src="img"></image>
				</view>
				<view class="cardtype_text">
					<view class="cardtype_text_left">{{name}}</view>
					<view class="cardtype_text_right">最低充值额为{{cost}}元</view>
				</view>
				<view class="cardtype_title">说明</view>
				<view class="cardtype_explanation">{{text}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			height: 0,
			img:"",
			name:"",
			cost:"",
			text:""
		}
	},
	onLoad: function (options) {
		let opid = this.checkLogin('../vipcard/vipcard',1);
		if(!!opid){
			this.$showLoading();
			this.height = uni.getSystemInfoSync().windowHeight;
			if(options.imgUrl != "null"){
				this.img = options.imgUrl;
			}else{
				this.img = '../../static/zhanwei.jpg';
			}
			this.name = options.cardName;
			this.cost = options.cost;
			this.getData(options.pkNo);
		};
	},
	methods: {
		getData: function (No) {
			uni.request({
				url: this.apiServer + 'userServer/openUserServer/getCardTypeDetails',
				method: 'POST',
				data: {
					typeNo: No
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						if(!!data){
							this.text = data;
						}
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					this.reconnect('../vipcard/vipcard',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			});
		}
	}
}
</script>

<style scoped>
#CARDTYPE{
	background-color: #F4F4F4;
}
.cardtype_box{
	width: 88%;
	margin: 8px auto 0px;
}
.cardtype_img{
	width: 100%;
	height: 0;
	padding-bottom: 60%;
	position: relative;
	margin-bottom: 10px;
}
.cardtype_img image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.cardtype_text{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1em;
	color: #666666;
	font-family: "黑体";
}
.cardtype_text_left{
	font-weight: bold;
}
.cardtype_title{
	width: 100%;
	text-align: center;
	font-size: 1em;
	color: #666666;
	font-family: "黑体";
	margin: 15px 0px 10px;
}
.cardtype_explanation{
	font-size: 0.9em;
	color: #666666;
	font-family: "黑体";
}
</style>
