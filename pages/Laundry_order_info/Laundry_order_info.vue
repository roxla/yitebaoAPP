<template>
	<view id="LAUNDRY_INFO">
		<scroll-view scroll-y class="info_box" :style="'height:'+height+'px'">
			<view class="info_item_box">
				<dl class="info_item">
					<dd class="info_item_left">联系人</dd>
					<dd class="info_item_right">{{userName}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">联系电话</dd>
					<dd class="info_item_right">{{userTel}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">洗护单号</dd>
					<dd class="info_item_right">{{orderNo}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">收取时间</dd>
					<dd class="info_item_right">{{OrderDate}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">完成时间</dd>
					<dd class="info_item_right">{{finishDt}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">应收金额</dd>
					<dd class="info_item_right">{{receivableMoney.toFixed(2)}}元</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">洗护费</dd>
					<dd class="info_item_right">{{WashPrice.toFixed(2)}}元</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">附加费</dd>
					<dd class="info_item_right">{{AttachPrice.toFixed(2)}}元</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">总金额</dd>
					<dd class="info_item_right">{{TotalPrice.toFixed(2)}}元</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">折扣额</dd>
					<dd class="info_item_right">{{DiscountValue.toFixed(2)}}元</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">优惠券</dd>
					<dd class="info_item_right">{{Coupon.toFixed(2)}}元</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">实付金额</dd>
					<dd class="info_item_right" :class="payMethod=='未支付'?'hide':''">{{payMethod}}支付 {{payMoney.toFixed(2)}}元</dd>
					<dd class="info_item_right" :class="payMethod=='未支付'?'':'hide'">{{payMethod}}</dd>
				</dl>
				<view class="info_link" @click="goRoute()">
					<view class="info_link_text">物件详情</view>
					<view class="info_link_icon">
						<view>{{objNumber}}</view>
						<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
					</view>
				</view>
			</view>
			<view class="info_item_box">
				<dl class="info_item">
					<dd class="info_item_left">店铺名称</dd>
					<dd class="info_item_right">{{shopName}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left address_title">店铺地址</dd>
					<dd class="info_item_right address_text">{{shopAdd}}</dd>
				</dl>
				<dl class="info_item">
					<dd class="info_item_left">店铺电话</dd>
					<dd class="info_item_right">{{contectTel}}</dd>
				</dl>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue"
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			height: 0,
			orderNo: '',
			Coupon: 0,
			shopName: '',
			userTel: '',
			userName: '',
			AttachPrice: 0,
			OrderDate: '',
			receivableMoney: 0,
			objNumber: 0,
			payMoney: 0,
			TotalPrice: 0,
			finishDt: '',
			DiscountValue: 0,
			contectTel: '',
			shopAdd: '',
			WashPrice: 0,
			payMethod: ''
		}
	},
	onLoad: function (options) {
		this.checkLogin('../Laundry_order/Laundry_order',1);
		this.height = uni.getSystemInfoSync().windowHeight;
		this.orderNo = options.No;
		this.getData(options.No);
	},
	methods: {
		formatDate: function (now) {
			let year=now.getFullYear();
			let month=now.getMonth()+1;
			let date=now.getDate();
			let hour=now.getHours();
			let minute=now.getMinutes();
			let second=now.getSeconds();
			if(month<10){
			month = '0' + month;
			};
			if(date<10){
			date = '0' + date;
			};
			if(hour<10){
			hour = '0' + hour;
			};
			if(minute<10){
			minute = '0' + minute;
			};
			if(second<10){
			second = '0' + second;
			};
			return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
		},
		goRoute: function () {
			uni.navigateTo({
				url:'../object_info/object_info?orderNo='+this.orderNo
			});
		},
		getData: function (orderNo) {
			uni.request({
				url: this.apiServer + 'orderServer/orderManagement/getOrderDetails',
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
						if(!!data.Coupon){
							this.Coupon = data.Coupon;
						}else{
							this.Coupon = 0;
						};
						this.shopName = data.shopName;
						this.userTel = data.userTel;
						this.userName = data.userName;
						if(!!data.AttachPrice){
							this.AttachPrice = data.AttachPrice;
						}else{
							this.AttachPrice = 0;
						};
						if(!!data.OrderDate){
							this.OrderDate = this.formatDate(new Date(data.OrderDate));
						}else{
							this.OrderDate = '未收取'
						}
						if(!!data.receivableMoney){
							this.receivableMoney = data.receivableMoney;
						}else{
							this.receivableMoney = 0;
						};
						this.objNumber = data.objNumber;
						this.payMethod = data.payMethod;
						if(!!data.payMoney){
							this.payMoney = data.payMoney;
						}else{
							this.payMoney = 0;
						};
						if(!!data.TotalPrice){
							this.TotalPrice = data.TotalPrice;
						}else{
							this.TotalPrice = 0;
						};
						if(!!data.finishDt){
							this.finishDt = this.formatDate(new Date(data.finishDt));
						}else{
							this.finishDt = '未完成';
						}
						if(!!data.DiscountValue){
							this.DiscountValue = data.DiscountValue;
						}else{
							this.DiscountValue = 0;
						};
						this.contectTel = data.contectTel;
						this.shopAdd = data.shopAdd;
						if(!!data.WashPrice){
							this.WashPrice = data.WashPrice;
						}else{
							this.WashPrice = 0;
						};
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					};
				},
				fail: () => {
					this.reconnect('../wallet/wallet',1);
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
	font-size: 0.8em;
	margin: 3% auto 0px;
	width: 93%;
	border: 1px solid #E3E3E3;
}
.info_item_box:last-of-type{
	margin-bottom: 3%;
}
.info_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2% 3%;
	border-bottom: 1px solid #E3E3E3;
}
.info_item:last-of-type{
	border-bottom: 0px;
}
.address_title{
	flex: 1;
}
.address_text{
	flex: 2;
	text-align: right;
}
.info_link{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2% 5px 2% 3%;
	background-color: white;
	font-size: 1em;
	border-top: 1px solid #E3E3E3;
}
.info_link_icon{
	display: flex;
	align-items: center;
}
.hide{
	display: none;
}
</style>
