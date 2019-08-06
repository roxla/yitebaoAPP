<template>
	<view id="RECHANGE">
		<view class="rechange_title">请务必认真核对资料</view>
		<view class="rechange_box">
			<dl class="info_item">
				<dd class="info_item_left">卡名称</dd>
				<dd class="info_item_right">{{type}} ({{cardType}}折卡)</dd>
			</dl>
			<dl class="info_item">
				<dd class="info_item_left">卡面号码</dd>
				<dd class="info_item_right">{{cardNo}}</dd>
			</dl>
			<dl class="info_item">
				<dd class="info_item_left">卡内余额</dd>
				<dd class="info_item_right">{{money}}元</dd>
			</dl>
		</view>
		<view class="rechange_card_title">
			<view class="card_title_left">注：</view>
			<view class="card_title_right">
				<view class="">选择不同充值金额将享受不同折扣优惠。</view>
				<view class="">卡内如有余额时，支付金额会有所涨幅。</view>
			</view>
		</view>
		<view class="rechange_card_box" :style="'height:'+height+'px'">
			<scroll-view scroll-y style="height: 100%;">
				<view class="rechange_card_item">
					<view class="card-box" v-for="(item,index) in cardList" :key="index"
						@click="selectType(item)" :class="cardActive==item.pkNo?'box':''">
						<view class="card-box-item">
							<view class="card-rechange-text">余额折算后需付</view>
							<view class="card-explain" :class="cardActive==item.pkNo?'explain':''">￥{{item.payMoney}}</view>
							<view class="card-money">
								<view>￥<text class="card-money-item">{{item.actualAmount}}</text></view>
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
		<view class="button-box">
			<view class="wxpay">
				<button class="wxpay-button" type="primary" style="background-color: #00CB15;" @click="rechangeWX">
					<view class="pay-box">
						<view class="pay-item-left">
							<image src="../../static/vip_card/u606.png" class="pay-img"></image>
							<view class="">微信支付</view>
						</view>
						<view class="pay-item-right">
							￥<text class="pay-money">{{cost}}</text>
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
							￥<text class="pay-money">{{cost}}</text>
						</view>
					</view>
				</button>
			</view>
		</view>
		<system></system>
	</view>
</template>

<script>
export default {
	data() {
		return {
			height:0,
			cardNo:"",
			type:"",
			cardType:"",
			money:"",
			cardList:[],
			cardActive:"",
			cash:"",
			cardData:{},
			cost:""
		}
	},
	onLoad: function (options) {
		this.height = uni.getSystemInfoSync().windowHeight - 275;
		let opid = this.checkLogin('../wallet/wallet',1);
		if(!!opid){
			this.$showLoading();
			this.cardNo = options.cardId;
			this.money = options.money;
			this.type = options.typeName;
			this.getAllData(options.cardId);
		};
	},
	methods: {
		getAllData: function (options) {
			uni.request({
				url:this.apiServer + 'userServer/cunUserServer/getCardTypeAndCount',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid"),
					cardNo:options
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log(res);
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
						this.getSelectType(this.cardList,options);
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					this.reconnect('../wallet/wallet',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
		getSelectType: function (data,no) {
			for(let i=0;i<data.length;i++){
				if(data[i].check==true){
					this.cardActive = data[i].pkNo;
					this.cardData = data[i];
					this.cost = data[i].payMoney;
					this.cardType = data[i].discount;
				};
			};
		},
		selectType: function (data) {
			this.cardActive = data.pkNo;
			this.cardData = data;
			this.cost = data.payMoney;
		},
		rechangeWX: function () {
			let card = this.cardData;
			if(card.payMoney < card.actualAmount){
				this.$showModal({
					title: "提示",
					content: "即将降级到"+card.discount+"折卡,需支付"+this.cost+"元,可获得"+card.actualAmount+"元",
					contentAlign: "center",
					confirmText: "确认",
					cancelText: "取消",
					callback: res => {
						if (res.confirm) {
							uni.request({
								url:this.apiServer + 'userServer/cunUserServer/cardRecharge',
								method: 'POST',
								data: {
									OpenId: uni.getStorageSync("openid"),
									cardNo: this.cardNo,
									typeNo: card.pkNo
								},
								header: {
									'content-Type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									console.log(res);
								}
							});
						}
					},
				});
			}else if(card.payMoney > card.actualAmount){
				this.$showModal({
					title: "提示",
					content: "即将升级到"+card.discount+"折卡,需支付"+this.cost+"元,可获得"+card.actualAmount+"元",
					contentAlign: "center",
					confirmText: "确认",
					cancelText: "取消",
					callback: res => {
						if (res.confirm) {
							uni.request({
								url:this.apiServer + 'userServer/cunUserServer/cardRecharge',
								method: 'POST',
								data: {
									OpenId: uni.getStorageSync("openid"),
									cardNo: this.cardNo,
									typeNo: card.pkNo
								},
								header: {
									'content-Type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									console.log(res);
								}
							});
						}
					},
				});
			}else{
				uni.request({
					url:this.apiServer + 'userServer/cunUserServer/cardRecharge',
					method: 'POST',
					data: {
						OpenId: uni.getStorageSync("openid"),
						cardNo: this.cardNo,
						typeNo: card.pkNo
					},
					header: {
						'content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						console.log(res);
					}
				});
			}
			
		}
	}
}
</script>

<style scoped>
#RECHANGE{
	background-color: #F4F4F4;
}
/* 卡信息 */
.rechange_title{
	color: red;
	font-size: 14px;
	text-align: center;
	padding-top: 5px;
	margin-bottom: 5px;
}
.rechange_box{
	margin: 0px auto 5px;
	width: 94%;
	background-color: white;
	border: 1px solid #E3E3E3;
}
.info_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #E3E3E3;
	font-size: 13px;
}
.info_item:last-of-type{
	border-bottom: 0px;
}
.info_item_right{
	text-align: right;
	color: #7F7F7F;
}
/* 卡充值 */
.rechange_card_title{
	display: flex;
	color: red;
	font-size: 13px;
	justify-content: center;
	margin-bottom: 5px;
}
.rechange_card_box{
	width: 94%;
	margin: auto;
}
.rechange_card_item{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.card-box{
	background-color: #0ABFB7;
	width: 48%;
	height: 0px;
	padding-bottom: 31%;
	position: relative;
	margin-bottom: 15px;
	border-radius: 10px;
}
.card-box-item{
	position: absolute;
	width: 100%;
	height: 100%;
}
.card-box:nth-of-type(2n){
	margin-right: 0px;
}
.card-rechange-text{
	text-align: left;
	font-size: 0.7em;
	padding-left: 3px;
	color: white;
	position: absolute;
	top: 9px;
	left: 0px;
}
.card-explain{
	background-color: #FEA110;
	font-size: 0.7em;
	color: white;
	text-align: center;
	width: 33%;
	padding-right: 3px;
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
.box{
	background-color: #FEA110;
}
.explain{
	background-color: #0ABFB7;
}
/* 按钮 */
.button-box{
	width: 100%;
	background-color: #F4F4F4;
	position: absolute;
	bottom: 0px;
	z-index: 11;
}
.wxpay,.alipay{
	width: 94%;
	margin: auto;
}
.wxpay-button,.alipay-button{
	height: 36px;
	line-height: 36px;
	margin-top: 5px;
}
.alipay{
	padding-bottom: 5px;
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
</style>
