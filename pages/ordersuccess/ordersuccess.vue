<template>
	<view id="SUCCESS" :style="'height:'+height+'px'">
		<view class="success-box">
			<view class="success-img-box">
				<image src="../../static/logo/u10410.png" class="success-img"></image>
			</view>
			<view class="success-text">预约成功</view>
			<view class="success-tip">最迟上门时间为 {{shopTime}}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			height:0,
			shopTime:""
		}
	},
	onLoad: function () {
		this.height = uni.getSystemInfoSync().windowHeight;
		this.goOrderList();
	},
	onNavigationBarButtonTap: function (){
		uni.removeStorageSync("orderNo");
		uni.reLaunch({
			url: "../reservation_order/reservation_order"
		});
	},
	methods: {
		goOrderList: function () {
			uni.request({
				url: this.apiServer + 'orderServer/cunOrderServer/getReserveDetails',
				method: 'POST',
				data: {
					OpenId: uni.getStorageSync("openid"),
					reserveNo: uni.getStorageSync("orderNo")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log(res);
					if(res.data.status === 200){
						this.shopTime = res.data.data.makeIt;
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					};
				},
				fail: () => {
					this.reconnect('../ordersuccess/ordersuccess',1);
				}
			})
			
		}
	}
}
</script>

<style scoped>
#SUCCESS{
	background-color: #F6F6F6;
}
.success-box{
	padding-top: 10%;
}
.success-img-box{
	width: 20%;
	height: 0px;
	padding-bottom: 20%;
	margin: auto;
	position: relative;
}
.success-img{
	width: 100%;
	height: 100%;
	position: absolute;
}
.success-text{
	margin-top: 5px;
	text-align: center;
}
.success-tip{
	margin-top: 10px;
	text-align: center;
	font-size: 0.8em;
	color: red;
	font-weight: bold;
}
</style>
