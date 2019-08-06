<template>
	<view id="RESERVATION">
		<view class="time_search button_color" v-if="!timeSearch" @click="onShowDatePicker">日 期 时 间 查 询</view>
		<view class="time_search time_color" v-if="timeSearch" @click="onShowDatePicker">{{rangetime[0]}} - {{rangetime[1]}}</view>
		<uni-segmented-control :Margin="styleMargin" :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#F4A62F"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0" class="select_item">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="laundry_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="laundry_item1">
							<view class="laundry_item_img">
								<image src="../../static/laundry/u5868.png"></image>
							</view>
							<view>
								<view class="laundry_item_text">{{item.reserveNumber}}</view>
								<view class="laundry_item_time">{{item.createDate}}</view>
							</view>
						</view>
						<view class="laundry_item2">
							<view class="laundry_item_box">
								<view class="laundry_item_type">未处理</view>
							</view>
							<uni-icon type="arrowright" size="25" color="#676767"></uni-icon>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 1" class="select_item">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="laundry_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="laundry_item1">
							<view class="laundry_item_img">
								<image src="../../static/laundry/u6021.png"></image>
							</view>
							<view>
								<view class="laundry_item_text">{{item.reserveNumber}}</view>
								<view class="laundry_item_time">{{item.createDate}}</view>
							</view>
						</view>
						<view class="laundry_item2">
							<view class="laundry_item_box">
								<view class="laundry_item_type">待收件</view>
							</view>
							<uni-icon type="arrowright" size="25" color="#676767"></uni-icon>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 2" class="select_item">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="laundry_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="laundry_item1">
							<view class="laundry_item_img">
								<image src="../../static/laundry/u6111.png"></image>
							</view>
							<view>
								<view class="laundry_item_text">{{item.reserveNumber}}</view>
								<view class="laundry_item_time">{{item.createDate}}</view>
							</view>
						</view>
						<view class="laundry_item2">
							<view class="laundry_item_box">
								<view class="laundry_item_type">洗涤中</view>
							</view>
							<uni-icon type="arrowright" size="25" color="#676767"></uni-icon>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 3" class="select_item">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="laundry_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="laundry_item1">
							<view class="laundry_item_img">
								<image src="../../static/laundry/u6209.png"></image>
							</view>
							<view>
								<view class="laundry_item_text">{{item.reserveNumber}}</view>
								<view class="laundry_item_time">{{item.createDate}}</view>
							</view>
						</view>
						<view class="laundry_item2">
							<view class="laundry_item_box">
								<view class="laundry_item_type">配送中</view>
							</view>
							<uni-icon type="arrowright" size="25" color="#676767"></uni-icon>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 4" class="select_item">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="laundry_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="laundry_item1">
							<view class="laundry_item_img">
								<image src="../../static/laundry/u6209.png"></image>
							</view>
							<view>
								<view class="laundry_item_text">{{item.reserveNumber}}</view>
								<view class="laundry_item_time">{{item.createDate}}</view>
							</view>
						</view>
						<view class="laundry_item2">
							<view class="laundry_item_box">
								<view class="laundry_item_type">已完成</view>
							</view>
							<uni-icon type="arrowright" size="25" color="#676767"></uni-icon>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 5" class="select_item">
				<scroll-view style="height: 100%;" scroll-y>
					<view class="laundry_box" v-for="(item,index) in dataList" :key="index" @click="getInfo(item)">
						<view class="laundry_item1">
							<view class="laundry_item_img">
								<image src="../../static/laundry/u6209.png"></image>
							</view>
							<view>
								<view class="laundry_item_text">{{item.reserveNumber}}</view>
								<view class="laundry_item_time">{{item.createDate}}</view>
							</view>
						</view>
						<view class="laundry_item2">
							<view class="laundry_item_box">
								<view class="laundry_item_type">已取消</view>
							</view>
							<uni-icon type="arrowright" size="25" color="#676767"></uni-icon>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<mx-date-picker
			:show="showPicker"
			type="rangetime"
			format="yyyy-mm-dd hh:ii:ss"
			:value="rangetime"
			:show-seconds="true"
			@confirm="onSelected"
			@cancel="onSelected"/>
		<!-- 弹窗 -->
		<popup-layer ref="popupRef" direction="top">
			<scroll-view scroll-y class="info_box">
				<view class="info_status">
					<view class="info_status_left">预约状态：</view>
					<view class="info_status_right">{{orderState}}</view>
				</view>
				<view class="info_contact">
					<view class="info_contact_left">联系人：{{resName}}</view>
					<view class="info_contact_right">{{resTel}}</view>
				</view>
				<view class="info_address">
					<view class="info_address_left">上门地址：</view>
					<view class="info_address_right">{{resAddress}}</view>
				</view>
				<view class="info_line"></view>
				<view class="info_shop_title">{{shopName}}</view>
				<view class="shop_address">
					<view class="shop_address_left">店铺地址：</view>
					<view class="shop_address_right">{{shopAdd}}</view>
				</view>
				<view class="shop_tel">店铺电话：{{shopTel}}</view>
				<view class="info_item_box">
					<dl class="info_item">
						<dd class="info_item_left">预约号</dd>
						<dd class="info_item_right">{{reserveNumber}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">下单时间</dd>
						<dd class="info_item_right">{{createDate}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">上门时间</dd>
						<dd class="info_item_right">{{makeIt}}</dd>
					</dl>
					<dl class="info_item">
						<dd class="info_item_left">预约件数</dd>
						<dd class="info_item_right">{{iCount}}</dd>
					</dl>
				</view>
				<view class="info_link" @click="goRoute('../Laundry_order_info/Laundry_order_info',orderNo)">
					<view class="info_link_text">洗衣单号：{{orderNo}}</view>
					<view class="info_link_icon">
						<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
					</view>
				</view>
				<view class="info_link">
					<view class="info_link_text">收取信息：无</view>
					<view class="info_link_icon">
						<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
					</view>
				</view>
				<view class="info_link">
					<view class="info_link_text">配送信息：无</view>
					<view class="info_link_icon">
						<uni-icon type="arrowright" size="24" color="#676767"></uni-icon>
					</view>
				</view>
			</scroll-view>
			<button @click="close" type="primary" style="height: 36px;line-height: 36px;font-size: 15px;">关 闭</button>
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
			items: ['未处理','待收件','洗涤中','配送中','已完成','已取消'],
			current: 0,
			showPicker: false,
			rangetime: [],
			value: '',
			timeSearch: false,
			dataList:[],
			test:"123",
			styleMargin:true,
			// 详情
			makeIt:"",
			createDate:"",
			resAddress:"",
			resName:"",
			resTel:"",
			reserveNumber:"",
			shopName:"",
			shopTel:"",
			shopAdd:"",
			iCount:"",
			orderNo:"",
			orderState:"",
			laundry:true
		}
	},
	onNavigationBarButtonTap: function () {
		uni.switchTab({url:"../my/my"});
	},
	onPullDownRefresh: function () {
		this.getAllData(this.current);
		this.value = "";
		this.rangetime = [];
		this.timeSearch = false;
		this.$refs.popupRef.close();
		uni.stopPullDownRefresh();
	},
	onLoad: function () {
		let opid = this.checkLogin('../reservation_order/reservation_order',1);
		if(!!opid){
			this.$showLoading();
			this.getAllData(0);
		};
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
				this.getAllData(index);
				this.value = "";
				this.rangetime = [];
				this.timeSearch = false;
			};
		},
		getAllData: function (type,stime,etime) {
			if(!stime){
				stime = "";
			};
			if(!etime){
				etime = "";
			};
			uni.request({
				url: this.apiServer + 'orderServer/cunOrderServer/getReserve',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid"),
					reserveState:type,
					start:stime,
					end:etime
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							let time = this.formatDate(new Date(data[i].createDate));
							data[i].createDate = time;
						}
						this.dataList = data;
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					this.reconnect('../reservation_order/reservation_order',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
		onShowDatePicker: function (type) {//显示
			this.showPicker = true;
			this.value = this.rangetime;
		},
		onSelected: function (e) {//选择
			this.showPicker = false;
			if(e) {
				this.rangetime = e.value;
				this.getAllData(this.current,e.value[0],e.value[1]);
				this.timeSearch = true;
			}
		},
		getInfo: function (data){
			uni.request({
				url: this.apiServer + 'orderServer/cunOrderServer/getReserveDetails',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid"),
					reserveNo:data.reserveNumber
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						console.log(data);
						if(!data.orderNo){
							data.orderNo = "无"
						};
						switch (data.orderState){
							case 0:
								this.orderState = "未处理"
								break;
							case 1:
								this.orderState = "待收件"
								break;
							case 2:
								this.orderState = "洗涤中"
								break;
							case 3:
								this.orderState = "配送中"
								break;
							case 4:
								this.orderState = "已完成"
								break;
							case 5:
								this.orderState = "已取消"
								break;
							default:
								console.log("error");
								break;
						}
						this.makeIt = data.makeIt;
						this.createDate = this.formatDate(new Date(data.createDate));
						this.reserveNumber = data.reserveNumber;
						this.resAddress = data.resAddress;
						this.resName = data.resName;
						this.resTel = data.resTel;
						this.shopName = data.shopName;
						this.shopTel = data.shopTel;
						this.shopAdd = data.shopAdd;
						this.iCount = data.iCount;
						this.orderNo = data.orderNo;
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				}
			})
			this.$refs.popupRef.show();
		},
		close: function (data) {
			this.$refs.popupRef.close();
		},
		goRoute: function (url,data) {
			if(data != "无"){
				this.$refs.popupRef.close();
				uni.navigateTo({
					url:url+'?No='+data
				});
			}
		}
	}
}
</script>

<style scoped>
#RESERVATION{
	background-color: white !important;
}
.select_item{
	height: calc(100vh - 20px);
	padding: 10px;
	padding-bottom: 0px;
}
.laundry_box{
	display: flex;
	align-items: center;
	width: 96%;
	border: 1px solid #B3B3B3;
	padding: 3px 5px;
	padding-right: 0px;
	margin: auto;
	margin-bottom: 10px;
}
.laundry_item1{
	display: flex;
	align-items: center;
	flex: 3;
}
.laundry_item2{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 1;
}
.laundry_item_img{
	width: 14%;
	height: 0;
	padding-bottom: 14%;
	position: relative;
}
.laundry_item_img image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.laundry_item_text{
	font-size: 0.7em;
	padding-left: 5px;
	color: #777777;
	font-weight: bold;
}
.laundry_item_type{
	font-size: 0.8em;
	text-align: right;
	font-weight: bold;
	color: #656565;
}
.laundry_item_time{
	font-size: 0.6em;
	color: #676767;
	padding-left: 5px;
}
.laundry_item_box{
	margin-right: 5px;
}
.time_search{
	text-align: center;
	padding: 5px 0;
	font-size: 15px;
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
.info_status{
	display: flex;
	padding: 12% 5% 2%;
	background-color: white;
	font-size: 0.8em;
}
.info_contact,.info_address{
	display: flex;
	padding: 2% 5%;
	background-color: white;
	font-size: 0.8em;
}
.info_status,.shop_tel,.info_item_box,.info_link{
	border-bottom: 1px solid #E3E3E3;
}
.info_status_left{
	width: 50%;
	text-align: left;
}
.info_status_right{
	width: 50%;
	text-align: right;
}
.info_contact_left{
	flex: 2;
	text-align: left;
}
.info_contact_right{
	flex: 1;
	text-align: right;
}
.info_address{
	padding-top: 0px;
}
.info_address_left{
	width: 23%;
}
.info_address_right{
	width: 77%;
}
.info_line{
	background-image: url(../../static/laundry/u6281.png);
	height: 3px;
}
.info_shop_title{
	padding: 2% 5%;
	background-color: white;
	font-weight: bold;
	color: #656565;
	font-size: 1em;
}
.shop_address{
	display: flex;
	padding: 0px 5% 2%;
	background-color: white;
	font-size: 0.8em;
}
.shop_address_left{
	width: 23%;
}
.shop_address_right{
	width: 77%;
}
.shop_tel{
	padding: 0px 5% 2%;
	background-color: white;
	font-size: 0.8em;
}
.info_item_box{
	background-color: white;
	font-size: 0.8em;
}
.info_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2% 5% 0px;
}
.info_item:last-of-type{
	padding-bottom: 2%;
}
.info_link{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2% 5px 2% 5%;
	background-color: white;
	font-size: 0.8em;
}
</style>
