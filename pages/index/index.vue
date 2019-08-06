<template>
	<view id="INDEX">
		<scroll-view scroll-y :style="'height:'+height+'px'" v-if="reconnect">
			<view>
				<uni-swiper-dot :info="img_info" :current="current" field="content" :mode="mode">
					<swiper :style="'height:'+height*0.27+'px'" @change="changeIndicatorDots" autoplay="true" interval="4000">
						<swiper-item v-for="(item ,index) in img_info" :key="index">
							<view class="swiper-item">
								<image :src="item.content" class="index_img"></image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="index_list">
				<view class="index_list_title">洗护服务</view>
				<view class="index_list_box" >
					<view class="index_list_item" @click="goShopOrder(item,index)" :class="itemList.length%2==0?'':'lastItem'" v-for="(item,index) in itemList" :key="index">
						<view class="index_list_img">
							<image :src="item.imagePath" class="list_img"></image>
						</view>
						<view class="index_list_text">{{item.typeName}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="reconnect_button" v-if="!reconnect" :style="'height:'+height+'px'">
			<view class="reconnect_box">
				<view class="reconnect_img_box">
					<image src="../../static/reconnection/timeout.png" mode=""></image>
				</view>
				<button type="primary" style="color: #02ABA4; border-color: #02ABA4;" plain="true" @click="reConnection()">重新加载</button>
			</view>
			<view style="width: 0px; height: 100%;"></view>
		</view>
		<view class="loadImg_box" :style="'height:'+height+'px'" v-if="load">
			<view style="display: block;">
				<view style="width: 30px; height: 30px; margin: 0px auto; 5px">
					<image src="../../static/fidget-spinner.gif" class="load_img"></image>
				</view>
				<view class="load_text">加载中...</view>
			</view>
			<view style="width: 0px; height: 100%;"></view>
		</view>
		<uni-popup :show="type" position="middle" mode="fixed" :maskClick="false">
			<view class="index_coupon_box" :style="'width:'+width+'px'">
				<view class="index_coupon_item">
					<view class="index_coupon_title">大额优惠券</view>
					<view class="index_coupon_close" @click="closeCoupon">
						<uni-icon type="closeempty" color="white" size="30"></uni-icon>
					</view>
				</view>
				<view class="index_coupon_list" :style="'max-height:'+height*0.3+'px'">
					<view class="coupon_box">
						<view class="coupon_img">
							<image src="../../static/coupon/u2274.png"></image>
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
								<view class="coupon_text_schedule">
									<view class="schedule_item_left" v-if="loading!=100">已抢{{loading}}%</view>
									<view class="schedule_item_left" v-if="loading==100">已抢完</view>
									<view class="schedule_item_right">
										<view class="schedule_item" :style="{'width':loading+'%'}"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="index_coupon_button">
					<button type="primary" @click="goRouter">立即领取</button>
				</view>
				<view class="index_coupon_tips">领取后可在我的-优惠券中查看</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import {uniSwiperDot} from '@dcloudio/uni-ui';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
	components: {
		uniSwiperDot,
		uniPopup,
		uniIcon
	},
	data() {
		return {
			img_info: [{
				content: '../../static/logo/head-portrait.png'
			}, {
				content: '../../static/logo/u10410.png'
			}, {
				content: '../../static/login_other/qq.png'
			}],
			current: 0,
			mode: 'default',
			height: 0,
			width: 0,
			itemList: [],
			type: false,
			loading: 55,
			reconnect: true,
			load: false,
			coupon: false
		}
	},
	onLoad: function () {
		this.height = uni.getSystemInfoSync().windowHeight;
		this.width = uni.getSystemInfoSync().screenWidth * 0.85;
		this.getShopData();
	},
	onShow: function () {
		if(this.coupon){
			this.showCoupon();
		}
	},
	methods: {
		changeIndicatorDots(e) {
			this.current = e.detail.current;
		},
		showCoupon: function () {
			let now = uni.getStorageSync("currentTime");
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let time = year+"-"+month+"-"+day;
			if(now != time){
				uni.setStorageSync("currentTime",time);
				this.type = true;
			}else{
				this.type = false;
			}
		},
		getShopData: function () {
			uni.request({
				url: this.apiServer + 'thingServer/openThingServer/getClothesType',
				method: 'POST',
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							if(!data[i].imagePath){
								data[i].imagePath = "../../static/zhanwei.jpg"
							};
						};
						this.itemList = data;
						this.reconnect = true;
						this.coupon = true;
						this.showCoupon();
					}else{
						this.coupon = false;
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
						setTimeout(() => {
							this.reconnect = false;
						},2000);
					}
				},
				fail: () => {
					this.reconnect = false;
					this.coupon = false;
				},
				complete: () => {
					this.load = false;
				}
			});
		},
		goShopOrder: function (data,index) {
			uni.reLaunch({
				url: '../laundry/laundry?typeNo='+data.typeNo+'&index='+index
			});
		},
		closeCoupon: function () {
			this.type = false;
		},
		reConnection: function () {
			this.load = true;
			this.getShopData();
		},
		goRouter: function () {
			uni.navigateTo({
				url:'../getcoupon/getcoupon'
			});
		}
	}
}
</script>

<style scoped>
#INDEX {
	background-color: #F4F4F4;
}
.index_img{
	width: 100%;
	height: 100%;
	position: absolute;
}
.index_list{
	padding: 3%;
}
.index_list_title{
	font-weight: bold;
	font-size: 1.1em;
	font-family: "黑体";
	margin-bottom: 2%;
}
.index_list_box{
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}
.index_list_item{
	width: 48%;
	border-radius: 5px;
	border: 1px solid #D9D9D9;
	background-color: white;
	box-shadow: rgba(168,168,168,0.7) 2px 2px 3px 1px;
	text-align: center;
	margin-top: 3%;
}
.index_list_item:nth-of-type(1),
.index_list_item:nth-of-type(2){
	margin-top: 0px;
}
.index_list_img{
	width: 90%;
	height: 0px;
	padding-bottom: 50%;
	position: relative;
	margin: 5% auto 2%;
}
.list_img{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.index_list_text{
	font-size: 0.8em;
	color: #7D7D7D;	font-family: "黑体";
	font-weight: bold;
	margin-bottom: 2%;
}
.lastItem:last-of-type{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: row-reverse;
}
.lastItem:last-of-type .index_list_img{
	width: 80%;
	height: 0px;
	padding-bottom: 32%;
	position: relative;
	margin: 2% auto;
}
.lastItem:last-of-type .index_list_text{
	margin: 2% auto 0px;
}
.index_coupon_box{
	background-color: #FF6666;
	padding: 7px 5px;
}
.index_coupon_item{
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-align: center;
	position: relative;
	color: white;
}
.index_coupon_title{
	width: 100%;
	font-weight: bold;
	font-size: 1.2em;
}
.index_coupon_close{
	position: absolute;
	right: 0;
}
.index_coupon_list{
	width: 92%;
	margin: auto;
	overflow-y: scroll;
}
.coupon_box{
	margin-top: 10px;
	display: flex;
	background-color: white;
	border: 1px solid #CCCCCC;
	align-items: center;
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
	width: calc(100% - 30%);
	padding-left: 5px;
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
	font-size: 0.7em;
	color: #666666;
	font-weight: bold;
}
.coupon_text_schedule{
	display: flex;
	align-items: center;
	margin-bottom: 2px;
}
.schedule_item_left{
	font-size: 0.6em;
	color: #666666;
	margin-right: 5px;
}
.schedule_item_right{
	height: 10px;
	width: 60%;
	border: 1px solid #666666;
	border-radius: 2500px;
	overflow: hidden;
}
.schedule_item{
	background-color: #FFCCCC;
	height: 100%;
}
.index_coupon_button{
	width: 33%;
	margin: 8px auto;
}
.index_coupon_button button{
	font-size: 0.8em;
	border-radius: 2500px;
	background-color: white;
	color: #FF3366;
	font-weight: bold;
	height: 26px;
	line-height: 26px;
}
.index_coupon_tips{
	width: 100%;
	color: white;
	font-size: 0.8em;
	text-align: center;
}
.reconnect_button{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60%;
	margin: auto;
}
.reconnect_box{
	width: 100%;
}
.reconnect_box button{
	width: 50%;
	margin: auto;
	height: 30px;
	line-height: 30px;
	font-size: 15px;
}
.reconnect_img_box{
	width: 40%;
	height: 0px;
	padding-bottom: 40%;
	margin: 0px auto 10px;
	position: relative;
}
.reconnect_img_box image{
	width: 100%;
	height: 100%;
	position: absolute;
}
.loadImg_box{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: #F4F4F4;
	position: absolute;
	z-index: 9999;
	bottom: 0;
}
.load_img{
	width: 30px;
	height: 30px;
	margin: auto;
}
.load_text{
	font-size: 0.8em;
}
</style>
