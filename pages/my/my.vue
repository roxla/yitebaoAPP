<template>
	<view id="MY" :style="'height:'+height+'px'">
		<view class="my_info" v-if="loging">
			<view class="my_info_img_box">
				<image class="my_info_img" :src="userImg" mode="aspectFit"></image>
			</view>
			<view class="my_info_text_box">
				<view class="my_info_text">
					<view class="my_info_text_item">{{userName}}</view>
					<view class="my_info_text_item">{{userTel}}</view>
					<view class="my_info_text_item vip" :class="VIP===true?'super-vip':''">非会员用户</view>
				</view>
				<view class="my_info_text" style="height: 100%; width: 0px;"></view>
			</view>
			<view class="my_info_icon_box">
				<view class="my_info_icon">
					<uni-icon class="uni_Icon" type="gear" color="#FFF" size="25" @click="goRouter('../setting/setting')"></uni-icon>
				</view>
			</view>
		</view>
		<view class="my_info" style="background-color: white;" v-if="!loging">
			<view class="my_info_login_item" style="width: calc(100% - 100px); padding: 0px 50px;">
				<view class="my_info_login_button" style="width: 100%;">
					<view class="login_button">
						<button type="primary" class="button_color" @click="goLogin('../login/login','../my/my',2)">登录</button>
					</view>
					<view class="login_button">
						<button type="default" style="color: #888888;" @click="goLogin('../reg/reg','../my/my',2)">注册</button>
					</view>
				</view>
				<view class="my_info_login_button" style="height: 100%; width: 0px;"></view>
			</view>
		</view>
		<view :style="'height:'+itemHeight+'px'">
			<scroll-view scroll-y style="height: 100%;">
				<view class="my_setting">
					<uni-list>
						<uni-list-item title="我的卡包" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/money.png"
							:show-badge="true" 
							:badge-text="cardMoney"
							:badge-inverted="true"
							badge-type="default"
							@click="goRouter('../wallet/wallet')">
						</uni-list-item>
						<uni-list-item title="我的优惠券" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/coupon.png"
							:show-badge="true" 
							:badge-text="couponNum"
							:badge-inverted="true"
							badge-type="default"
							@click="goRouter('../coupon/coupon?type=my')">
						</uni-list-item>
						<uni-list-item title="预约订单" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/order.png"
							:show-badge="true" 
							:badge-text="orderNum"
							:badge-inverted="true"
							badge-type="default"
							@click="goRouter('../reservation_order/reservation_order')">
						</uni-list-item>
						<uni-list-item title="商城订单" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/list.png"
							:show-badge="true" 
							:badge-text="12"
							:badge-inverted="true"
							badge-type="default"
							>
						</uni-list-item>
						<uni-list-item title="会员办理" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/vip.png"
							@click="goRouter('../vipcard/vipcard')">
						</uni-list-item>
						<uni-list-item title="消费记录" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/consumption.png"
							@click="goRouter('../consumption/consumption')">
						</uni-list-item>
						<uni-list-item title="开具发票" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/invoice.png"
							>
						</uni-list-item>
						<uni-list-item title="意见反馈" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/opinion.png"
							@click="goRouter('../feedback/feedback')">
						</uni-list-item>
						<uni-list-item title="分享赢好礼" 
							:show-extra-icon="true"
							thumb="../../static/my_setting/link.png"
							>
						</uni-list-item>
					</uni-list>
				</view>
				<view class="my_setting">
					<uni-list>
						<uni-list-item title="我的收藏" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/star.png"
							:show-badge="true" 
							badge-text="99+"
							badge-type="error">
						</uni-list-item>
						<uni-list-item title="系统通知" 
							:show-extra-icon="true" 
							thumb="../../static/my_setting/notice.png"
							:show-badge="true" 
							badge-text="99+"
							badge-type="error">
						</uni-list-item>
					</uni-list>
				</view>
			</scroll-view>
		</view>
		<system></system>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniIcon,
		uniList,
		uniListItem
	},
	data() {
		return {
			loging: true,
			userImg: '../../static/logo/head-portrait.png',
			userName: "",
			userTel: "",
			VIP: false,
			height: 0,
			itemHeight: 0,
			orderNum: '',
			cardMoney: 0,
			couponNum: ''
		}
	},
	onLoad:function () {
		this.height = uni.getSystemInfoSync().windowHeight + 1;
		this.itemHeight = uni.getSystemInfoSync().windowHeight - 110;
		let opid = uni.getStorageSync("openid");
		this.$showLoading();
		if(!!opid){
			this.getUserData();
		}else{
			this.loging = false;
			uni.removeStorageSync("openid");
			uni.removeStorageSync("userName");
			uni.removeStorageSync("userTel");
			this.$hideLoading();
		};
	},
	onPullDownRefresh: function () {
		this.getInfoData();
	},
	methods: {
		goRouter: function (url) {
			uni.reLaunch({
				url:url
			});
		},
		goLogin: function (url,backpage,backtype) {
			uni.reLaunch({
				url:url+"?backpage="+backpage+"&backtype="+backtype
			});
		},
		getUserData: function () {
			uni.request({
				url: this.apiServer + 'userServer/cunUserServer/getCunUserData',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log(res);
					if(res.data.status === 200){
						if(!!res.data.data.name){
							this.userName = res.data.data.name;
							if(!uni.getStorageSync("userName")){
								uni.setStorageSync("userName",res.data.data.name);
							}
						}else{
							this.userName = "userName";
						};
						if(!!res.data.data.tel){
							this.userTel = res.data.data.tel;
							if(!uni.getStorageSync("userTel")){
								uni.setStorageSync("userTel",res.data.data.tel);
							}
						}else{
							this.userTel = "userTel";
						};
						this.loging = true;
						this.getInfoData();
					}
					else if(res.data.status === 911){
						uni.removeStorageSync("openid");
						this.loging = false;
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
					else{
						this.userName = "userName";
						this.userTel = "userTel";
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					if(!!uni.getStorageSync("userName")){
						this.userName = uni.getStorageSync("userName");
					}else{
						this.userName = "userName";
					};
					if(!!uni.getStorageSync("userTel")){
						this.userTel = uni.getStorageSync("userTel");
					}else{
						this.userTel = "userTel";
					};
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
		getInfoData: function () {
			uni.request({
				url: this.apiServer + 'userServer/consumerManage/getConsumerInfo',
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
						let money;
						if(!!data.cardTotalMoney){
							money = data.cardTotalMoney;
						}else{
							money = 0;
						};
						this.cardMoney = money.toFixed(2);
						if(!!data.cardTotalMoney){
							if(parseInt(data.clothesCouponNumber)<=100){
								this.couponNum = data.clothesCouponNumber;
							}else{
								this.couponNum = '99+'
							}
						}else{
							this.couponNum = 0;
						};
						if(!!data.reserveOrderNumber){
							if(parseInt(data.reserveOrderNumber)<=100){
								this.orderNum = data.reserveOrderNumber;
							}else{
								this.orderNum = '99+'
							}
						}else{
							this.orderNum = 0;
						};
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: '网络请求错误',
						duration: 2000,
						icon: "none"
					});
				}
			})
		}
	}
}
</script>

<style scoped>
#MY{
	background-color: #F4F4F4;
	height: 100vh;
}
.button_color{
	background-color: #02ABA4;
}
.my_info{
	display: flex;
	padding: 30px 3% 10px;
	background-color: white;
	padding-top: 30px;
	background-color: #02C0D0;
	height: 70px;
	border-bottom: 1px solid #E3E3E3;
}
.my_info_login_item{
	height: 70px;
}
.login_button{
	display: inline-block;
	width: 50%;
}
.login_button button{
	width: 90%;
	line-height: 30px;
	height: 30px;
	font-size: 0.8em;
}
.my_info_login_button{
	height: 25px;
	display: inline-block;
	vertical-align: middle;
}
.my_info_img_box{
	width: 70px;
	height: 70px;
	border-radius: 100%;
	background-color: white;
}
.my_info_text_box{
	height: 70px;
	width: calc(100% - 95px);
}
.my_info_text{
	vertical-align: middle;
	display: inline-block;
}
.my_info_text_item{
	margin-left: 10px;
	font-size: 0.7em;
	color: white;
}
.vip{
	background-color: #BAF9FE;
	color: #04BFCF;
	padding: 0px 3px;
	border-radius: 3px;
	margin-top: 2px;
	font-weight: bold;
	font-size: 0.6em;
	text-align: center;
}
.super-vip{
	color: #F7CA1B;
}
.my_info_text_item:first-of-type{
	font-size: 0.8em;
	color: white;
	font-weight: bold;
}
.my_info_img{
	width: 100%;
	height: 100%;
	border-radius: 100%;
}
.my_info_icon{
	line-height: 70px;
}
.my_setting{
	margin-top: 20px;
}
</style>
