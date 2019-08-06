<template>
	<view id="WALLET">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#F4A62F"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0" class="select_item" :style="'height:'+height+'px'">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="wallet_box" v-for="(item,index) in cardList" :key="index">
						<view class="wallet_img">
							<image :src="item.typeImage" @click="showCardInfo(item)"></image>
						</view>
						<view class="wallet_set">
							<view class="wallet_set_item" @click="cardSearch(item)">
								<view class="rechange_icon">
									<image src="../../static/vip_card/u2435.png"></image>
								</view>
								<view class="rechange_text">
									<view class="rechange_text_item">查询交易记录</view>
									<view class="rechange_text_item" style="width: 0px; height: 100%;"></view>
								</view>
							</view>
							<view class="wallet_set_item rechange" @click="cardRechange(item)">
								<view class="rechange_icon">
									<image src="../../static/vip_card/u2437.png"></image>
								</view>
								<view class="rechange_text">
									<view class="rechange_text_item">充值</view>
									<view class="rechange_text_item" style="width: 0px; height: 100%;"></view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 1" class="select_item" :style="'height:'+height+'px'">
				
			</view>
		</view>
		<!-- 弹窗 -->
		<popup-layer ref="popupRef" direction="top">
			<scroll-view scroll-y class="info_box">
				<view class="info_item_box">
					<dl class="info_item">
						<dd class="info_item_left">卡号</dd>
						<dd class="info_item_right">{{pkNo}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">卡类型</dd>
						<dd class="info_item_right">{{typeName}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">卡状态</dd>
						<dd class="info_item_right">{{statName}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">有效期</dd>
						<dd class="info_item_right">{{endDate}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">卡内余额</dd>
						<dd class="info_item_right">{{balance}}元</dd>
					</dl>
				</view>
			</scroll-view>
			<view>
				<button @click="close" type="primary" style="height: 36px;line-height: 36px;font-size: 15px;">关 闭</button>
			</view>
		</popup-layer>
		<system></system>
	</view>
</template>

<script>
import popupLayer from '@/components/popup-layer/popup-layer.vue';
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
export default {
	components: {
		popupLayer,
		uniSegmentedControl
	},
	data() {
		return {
			items: ['会员卡','团洗卡'],
			current: 0,
			cardList: [],
			pkNo: "",
			typeName: "",
			statName: "",
			endDate: "",
			balance: "",
			height: 0
		}
	},
	onLoad: function () {
		let opid = this.checkLogin('../wallet/wallet',1);
		this.height = uni.getSystemInfoSync().windowHeight;
		if(!!opid){
			this.$showLoading();
			this.getData();
		}
	},
	onNavigationBarButtonTap: function () {
		uni.switchTab({url:"../my/my"});
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
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
		getData: function () {
			uni.request({
				url: this.apiServer + 'userServer/cunUserServer/getCunCard',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							if(!data[i].typeImage){
								data[i].typeImage = '../../static/vip_card/u2427.png'
							};
							if(!data[i].balance){
								data[i].balance = 0;
							};
							let time = this.formatDate(new Date(data[i].endDate));
							data[i].endDate = time;
							data[i].balance = parseFloat(data[i].balance).toFixed(2);
						}
						this.cardList = data;
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
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
		cardSearch: function (data) {
			uni.navigateTo({
				url:"../card_consumption/card_consumption?cardId="+data.pkNo
			});
		},
		cardRechange: function (data) {
			if(data.statName != "失效"){
				uni.navigateTo({
					url:"../rechange/rechange?cardId="+data.pkNo+"&money="+data.balance+"&typeName="+data.typeName
				});
			}else{
				uni.showToast({
					title: "此卡已失效",
					duration: 2000,
					icon: "none"
				});
			}
		},
		showCardInfo: function (data) {
			this.pkNo = data.pkNo;
			this.typeName = data.typeName;
			this.statName = data.statName;
			this.endDate = data.endDate;
			this.balance = data.balance;
			this.$refs.popupRef.show();
		},
		close: function (data) {
			this.$refs.popupRef.close();
		}
	}
}
</script>

<style scoped>
#WALLET{
	background-color: white;
}
.wallet_box{
	width: 90%;
	margin: 5% auto 0px;
}
.wallet_box:last-of-type{
	margin-bottom: 5%;
}
.wallet_img{
	width: 100%;
	height: 0;
	padding-bottom: 60%;
	position: relative;
}
.wallet_img image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.wallet_set{
	display: flex;
	margin-top: 5px;
}
.wallet_set_item{
	width: 50%;
	display: flex;
}
.rechange{
	justify-content: flex-end;
}
.rechange_icon{
	width: 18%;
	height: 0;
	padding-bottom: 18%;
	position: relative;
}
.rechange_icon image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.rechange_text{
	padding-left: 5px;
}
.rechange_text_item{
	font-size: 0.8em;
	display: inline-block;
	vertical-align: middle;
}
.info_box{
	height: calc(100vh - 36px);
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
</style>
