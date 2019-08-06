<template>
	<view id="VIPCARD">
		<view class="vipcard-box">
			<scroll-view scroll-y :style="'height:'+height+'px'">
				<view class="vipcard-item">
					<view class="card-box" v-for="(item,index) in cardList" :key="index"
						@click="selectType(item,index)" :class="cardActive==index?'box':''">
						<view class="card-box-item">
							<view class="card-explain" @click="goRouter(item)" :class="cardActive==index?'explain':''">本卡类型介绍</view>
							<view class="card-money">
								<view>￥<text class="card-money-item">{{item.givePoint}}</text></view>
							</view>
							<view class="card-type">
								<view class="card-type-left">{{item.name}}</view>
								<view class="card-type-right">{{item.discount}}折</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="wxpay">
			<button class="wxpay-button" type="primary" style="background-color: #00CB15;" @click="submitCardWX()">
				<view class="pay-box">
					<view class="pay-item-left">
						<image src="../../static/vip_card/u606.png" class="pay-img"></image>
						<view class="">微信支付</view>
					</view>
					<view class="pay-item-right">
						￥<text class="pay-money">{{money}}</text>
					</view>
				</view>
			</button>
		</view>
		<view class="alipay">
			<button class="alipay-button" type="primary" style="background-color: #0F79FC;">
				<view class="pay-box">
					<view class="pay-item-left">
						<image src="../../static/vip_card/u608.png" class="pay-img"></image>
						<view class="">支付宝支付</view>
					</view>
					<view class="pay-item-right">
						￥<text class="pay-money">{{money}}</text>
					</view>
				</view>
			</button>
		</view>
		<system></system>
	</view>
</template>

<script>
export default {
	data() {
		return {
			height:0,
			cardList:[],
			cardActive:0,
			cardTypeNo:"",
			money:""
		}
	},
	onNavigationBarButtonTap: function () {
		uni.switchTab({url:"../my/my"});
	},
	onLoad: function (){
		this.height = uni.getSystemInfoSync().windowHeight - 97;
		let opid = this.checkLogin('../vipcard/vipcard',1);
		if(!!opid){
			this.$showLoading();
			this.getData();
		};
	},
	methods: {
		selectType: function (data,index) {
			this.cardActive = index;
			this.cardTypeNo = data.pkNo;
			this.money = data.givePoint;
		},
		getData: function () {
			uni.request({
				url: this.apiServer + 'userServer/cunUserServer/getCardTypeAndCount',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid"),
					noCount: true
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							if(parseInt(data[i].discount)%10==0){
								data[i].discount = (parseInt(data[i].discount)/10).toFixed(0);
							}else{
								data[i].discount = (parseInt(data[i].discount)/10).toFixed(1);
							};
						}
						this.cardList = data;
						this.money = data[0].givePoint
					}else{
						
					}
				},
				fail: () => {
					this.reconnect('../vipcard/vipcard',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			});
		},
		goRouter: function (data) {
			if(!data.imageUrl){
				data.imageUrl = "null";
			};
			let imgurl = data.imageUrl;
			uni.navigateTo({
				url:"../cardtype/cardtype?imgUrl="+imgurl
				+"&cardName="+data.name
				+"&pkNo="+data.pkNo
				+"&cost="+data.givePoint
			});
		},
		submitCardWX: function () {
			uni.request({
				url: this.apiServer + 'userServer/cunUserServer/applyCard',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid"),
					cardTypeNo: this.cardTypeNo
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log(res);
				}
			})
		}
	}
}
</script>

<style>
#VIPCARD{
	background-color: #F4F4F4;
}
.vipcard-box{
	width: 90%;
	margin: auto;
}
.vipcard-item{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.card-box{
	background-color: #0ABFB7;
	width: 47%;
	height: 0px;
	padding-bottom: 31%;
	position: relative;
	margin-bottom: 15px;
	border-radius: 10px;
}
.card-box:nth-of-type(1),
.card-box:nth-of-type(2){
	margin-top: 15px;
}
.card-box-item{
	position: absolute;
	width: 100%;
	height: 100%;
}
.card-box:nth-of-type(2n){
	margin-right: 0px;
}
.card-explain{
	background-color: #FEA110;
	font-size: 0.8em;
	color: white;
	text-align: center;
	width: 60%;
	padding-right: 5px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	position: absolute;
	top: 9px;
	right: 0px;
}
.card-money{
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 15px;
}
.card-money-item{
	font-size: 28px;
}
.card-type{
	background-color: #E9E9E9;
	font-size: 15px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	bottom: 0px;
	border-radius: 10px
}
.card-type-left{
	margin-left: 5px;
}
.card-type-right{
	margin-right: 8px;
}
.wxpay,.alipay{
	width: 90%;
	margin: auto;
}
.wxpay-button{
	height: 36px;
	line-height: 36px;
	margin-top: 5px;
}
.alipay-button{
	height: 36px;
	line-height: 36px;
	margin-top: 10px;
}
.alipay{
	padding-bottom: 10px;
}
.pay-box{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.pay-item-left{
	display: flex;
	align-items: center;
	font-size: 15px;
}
.pay-img{
	width: 30px;
	height: 30px;
	margin-right: 5px;
}
.pay-item-right{
	font-size: 10px;
}
.pay-money{
	font-size: 16px;
}
.box{
	background-color: #FEA110;
}
.explain{
	background-color: #0ABFB7;
}
</style>
