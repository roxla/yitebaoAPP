<template>
	<view id="CARD_CONSUMPTION">
		<view class="time_search button_color" v-if="!timeSearch" @click="onShowDatePicker">日 期 时 间 查 询</view>
		<view class="time_search time_color" v-if="timeSearch" @click="onShowDatePicker">{{rangetime[0]}} - {{rangetime[1]}}</view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#F4A62F"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0" class="select_item" :style="'height:'+height+'px'">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="consum_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="consum_item">
							<view class="consum_item_img">
								<image src="../../static/consumption/u7234.png"></image>
							</view>
							<view class="consum_item_text">卡消费</view>
						</view>
						<view class="consum_item consum_text">
							<view class="consum_item_box">
								<view class="consum_item_money" style="color: red;">-{{item.recordValue}}</view>
								<view class="consum_item_time">{{item.RecordDt}}</view>
							</view>
							<view class="consum_item_icon">
								<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 1" class="select_item" :style="'height:'+height+'px'">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="consum_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="consum_item">
							<view class="consum_item_img">
								<image src="../../static/consumption/u7339.png"></image>
							</view>
							<view class="consum_item_text">卡扣款</view>
						</view>
						<view class="consum_item consum_text">
							<view class="consum_item_box">
								<view class="consum_item_money" style="color: red;">-{{item.deductionValue}}</view>
								<view class="consum_item_time">{{item.RecordDt}}</view>
							</view>
							<view class="consum_item_icon">
								<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 2" class="select_item" :style="'height:'+height+'px'">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="consum_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="consum_item">
							<view class="consum_item_img">
								<image src="../../static/consumption/u7437.png"></image>
							</view>
							<view class="consum_item_text">卡充值</view>
						</view>
						<view class="consum_item consum_text">
							<view class="consum_item_box">
								<view class="consum_item_money" style="color: #65C13E;">+{{item.rechargeValue}}</view>
								<view class="consum_item_time">{{item.rechargeDate}}</view>
							</view>
							<view class="consum_item_icon">
								<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<mx-date-picker
			:show="showPicker"
			type="rangetime"
			format="yyyy-mm-dd hh:ii:ss"
			:value="value"
			:show-seconds="true"
			@confirm="onSelected"
			@cancel="onSelected"/>
		<!-- 弹窗 -->
		<popup-layer ref="popupRef" direction="top">
			<scroll-view scroll-y class="info_box">
				<view class="info_item_box">
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">卡号：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{fkcardNo}}</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">卡类型：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">银卡</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">{{infoItem}}：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{fkOrderNo}}</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">交易金额：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{Value}} 元</view>
						</dd>
					</dl>
					<dl class="info_item" v-if="rechangeInfo">
						<dd class="info_item_left">
							<view class="title_item">赠送金额：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{GiveValue}} 元</view>
						</dd>
					</dl>
					<dl class="info_item" v-if="rechangeInfo">
						<dd class="info_item_left">
							<view class="title_item">支付方式：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{payMethod}}</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">交易时间：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{RecordDt}}</view>
						</dd>
					</dl>
				</view>
				<view class="info_item_box">
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">操作员工：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{user_Name}}</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">店铺名称：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{shop_Name}}</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">店铺地址：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{shop_add}}</view>
						</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">
							<view class="title_item">店铺电话：</view>
						</dd>
						<dd class="info_item_right">
							<view class="title_item">{{shop_tel}}</view>
						</dd>
					</dl>
				</view>
				<view class="info_item_box">
					<button @click="close" type="primary" style="height: 36px;line-height: 36px;font-size: 15px;">确 认</button>
				</view>
			</scroll-view>
		</popup-layer>
		<system></system>
	</view>
</template>

<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue"
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
import popupLayer from '@/components/popup-layer/popup-layer.vue'
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue"
export default {
	components: {
		uniIcon,
		MxDatePicker,
		uniSegmentedControl,
		popupLayer
	},
	data() {
		return {
			height: 0,
			items: ['卡消费','卡扣款','卡充值'],
			current: 0,
			showPicker: false,
			rangetime: [],
			value:'',
			timeSearch: false,
			cardNo:"",
			// 消费
			dataList:[],
			// 时间
			RecordDt:"",
			// 金额
			Value:"",
			// 卡号
			fkcardNo:"",
			// 洗护单号
			infoItem:"",
			fkOrderNo:"",
			// 员工姓名
			user_Name:"",
			// 店铺电话
			shop_tel:"",
			// 店铺名称
			shop_Name:"",
			// 店铺地址
			shop_add:"",
			// 充值项目
			rechangeInfo:false,
			GiveValue:"",
			payMethod:""
		}
	},
	onLoad: function (options) {
		let opid = this.checkLogin('../wallet/wallet',1);
		this.height = uni.getSystemInfoSync().windowHeight;
		if(!!opid){
			this.$showLoading();
			this.cardNo = options;
			this.getAllData(options,0);
		};
	},
	onPullDownRefresh: function () {
		this.getAllData(this.cardNo,this.current);
		this.value = "";
		this.rangetime = [];
		this.timeSearch = false;
		uni.stopPullDownRefresh();
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
		onClickItem: function (index) {
			if (this.current !== index) {
				this.dataList = [];
				this.current = index;
				this.getAllData(this.cardNo,index);
				this.value = "";
				this.rangetime = [];
			}
		},
		onShowDatePicker: function (type){//显示
			this.showPicker = true;
			this.value = this.rangetime;
		},
		onSelected: function (e) {//选择
			this.showPicker = false;
			if(e) {
				this.rangetime = e.value;
				this.getAllData(this.cardNo,this.current,e.value[0],e.value[1]);
				this.timeSearch = true;
			}
		},
		// 消费记录
		getAllData: function (data,type,stime,etime) {
			if(!stime){
				stime = "";
			};
			if(!etime){
				etime = "";
			};
			uni.request({
				url: this.apiServer + 'userServer/cunUserServer/getCardRecord',
				method: 'POST',
				data: {
					cardNo:data.cardId,
					OpenId:uni.getStorageSync("openid"),
					recordType:type,
					start:stime,
					end:etime
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						switch (type){
							case 0:
								for(let i=0;i<data.length;i++){
									let time = this.formatDate(new Date(data[i].RecordDt));
									data[i].RecordDt = time;
									if(!data[i].recordValue){
										data[i].recordValue = 0;
									};
									data[i].recordValue = data[i].recordValue.toFixed(2);
								};
								this.dataList = data;
								break;
							case 1:
								for(let i=0;i<data.length;i++){
									let time = this.formatDate(new Date(data[i].RecordDt));
									data[i].RecordDt = time;
									if(!data[i].deductionValue){
										data[i].deductionValue = 0;
									};
									data[i].deductionValue = data[i].deductionValue.toFixed(2);
								};
								this.dataList = data;
								break;
							case 2:
								for(let i=0;i<data.length;i++){
									let time = this.formatDate(new Date(data[i].rechargeDate));
									data[i].rechargeDate = time;
									if(!data[i].rechargeValue){
										data[i].rechargeValue = 0;
									};
									data[i].rechargeValue = data[i].rechargeValue.toFixed(2);
								};
								this.dataList = data;
								break;
							default:
								console.log("error");
								break;
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
					this.reconnect('../wallet/wallet',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
		getUserData: function (data) {
			uni.request({
				url: this.apiServer + 'shopServer/openWorkerServer/getWorkerData',
				method: 'POST',
				data: {
					workerNo:data
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						if(!!data){
							if(!!data.Name){
								this.user_Name = data.Name;
							}else{
								this.user_Name = "无";
							};
						}else{
							this.user_Name = "无";
						};
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				}
			});
		},
		getShopData: function (data) {
			uni.request({
				url: this.apiServer + 'shopServer/openShopServer/getShopData',
				method: 'POST',
				data: {
					shopNo:data
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						if(!!data){
							if(!!data.shopAdd){
								this.shop_add = data.shopAdd;
							}else{
								this.shop_add = "无";
							};
							if(!!data.contectTel){
								this.shop_tel = data.contectTel;
							}else{
								this.shop_tel = "无";
							};
							if(!!data.Name){
								this.shop_Name = data.Name;
							}else{
								this.shop_Name = "无";
							};
						}else{
							this.shop_add = "无";
							this.shop_tel = "无";
							this.shop_Name = "无";
						};
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				}
			})
		},
		// 弹窗
		getInfo: function (data) {
			this.fkcardNo = data.cardNumber;
			this.getUserData(data.workerNo);
			this.getShopData(data.shopNo);
			switch (this.current){
				case 0:
					this.infoItem = "洗护单号";
					this.Value = data.recordValue;
					this.fkOrderNo = data.orderNo;
					this.RecordDt = data.RecordDt;
					this.rechangeInfo = false;
					break;
				case 1:
					this.infoItem = "余额";
					if(!data.afterBlance){
						data.afterBlance = 0;
					}
					this.fkOrderNo = data.afterBlance.toFixed(2) + " 元";
					this.Value = data.deductionValue;
					this.RecordDt = data.RecordDt;
					this.rechangeInfo = false;
					break;
				case 2:
					this.infoItem = "余额";
					if(!data.afterBlance){
						data.afterBlance = 0;
					};
					if(!data.GiveValue){
						data.GiveValue = 0;
					};
					this.GiveValue = data.GiveValue.toFixed(2);
					switch (data.payMethod){
						case 0:
							this.payMethod = "现金";
							break;
						case 1:
							this.payMethod = "微信";
							break;
						case 2:
							this.payMethod = "支付宝";
							break;
						case 3:
							this.payMethod = "使用积分充值";
							break;
						case 4:
							this.payMethod = "微信刷卡支付";
							break;
						case 5:
							this.payMethod = "支付宝当面付";
							break;
					}
					this.fkOrderNo = data.afterBlance.toFixed(2) + " 元";
					this.Value = data.rechargeValue;
					this.RecordDt = data.rechargeDate;
					this.rechangeInfo = true;
					break;
				default:
					console.log("error");
					break;
			}
			this.$refs.popupRef.show();
		},
		close: function (data) {
			this.$refs.popupRef.close();
		},
	}
}
</script>

<style scoped>
#CARD_CONSUMPTION{
	background-color: white !important;
}
.select_item{
	padding: 10px;
	padding-bottom: 0px;
}
.consum_box{
	display: flex;
	align-items: center;
	width: 96%;
	border: 1px solid #B3B3B3;
	padding: 3px 5px;
	padding-right: 0px;
	margin: auto;
	margin-bottom: 10px;
}
.consum_item{
	display: flex;
	align-items: center;
	width: 50%;
	flex: 1;
}
.consum_text{
	justify-content: flex-end;
	flex: 2;
}
.consum_item_img{
	width: 21%;
	height: 0;
	padding-bottom: 21%;
	position: relative;
}
.consum_item_img image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.consum_item_text{
	font-size: 0.8em;
	padding-left: 5px;
	color: #777777;
	font-weight: bold;
}
.consum_item_money{
	font-size: 0.8em;
	text-align: right;
	font-weight: bold;
}
.consum_item_time{
	font-size: 0.6em;
	text-align: right;
	color: #676767;
}
.consum_item_box{
	margin-right: 5px;
}
.time_search{
	text-align: center;
	padding: 5px 0;
	font-size: 14px;
	border-bottom: 1px solid #E3E3E3;
}
.button_color{
	color: #399BFD;
}
.time_color{
	color: #798191;
}
.info_box{
	height: 100vh;
	background-color: #F4F4F4;
}
.info_item_box{
	margin: 3% 6% 0px;
	border: 1px solid #E3E3E3;
}
.info_item_box:last-of-type{
	margin-bottom: 3%;
}
.info_item{
	display: flex;
	font-size: 0.9em;
	background-color: white;
	padding: 2%;
	border-bottom: 1px solid #E3E3E3;
	align-items: center;
}
.info_item:last-of-type{
	border-bottom: 0px;
}
.info_item_left{
	flex: 1;
	text-align: right;
	line-height: 1;
}
.info_item_right{
	flex: 2;
}
.title_item{
	display: inline-block;
	vertical-align: middle;
}
</style>
