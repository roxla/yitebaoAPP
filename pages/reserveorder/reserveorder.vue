<template>
	<view id="RESERVEORDER">
		<scroll-view scroll-y :style="'height:'+height+'px'">
			<view class="reorder-box" @click="changeAddress" v-if="addressList">
				<view class="reorder-box-left title-text">地址为空，请去选择地址</view>
				<view class="reorder-box-right">
					<uni-icon type="arrowright" size="24" color="#BEBEBE"></uni-icon>
				</view>
			</view>
			<view class="reorder-box" @click="changeAddress" v-if="!addressList">
				<view class="reorder-box-left">
					<view class="box-item-top">{{fullAddress}}</view>
					<view class="box-item-bottom">
						<view class="item-name">{{userName}}</view>
						<view class="item-tel">{{tel}}</view>
					</view>
				</view>
				<view class="reorder-box-right">
					<uni-icon type="arrowright" size="20" color="#BEBEBE"></uni-icon>
				</view>
			</view>
			<view class="reorder-item-box top-border" @click="toggleTab('limit')">
				<view class="reorder-item-left">预约时间</view>
				<view class="reorder-item-right">
					<view class="order-item">{{orderTime}}</view>
					<uni-icon type="arrowright" size="20" color="#BEBEBE"></uni-icon>
				</view>
			</view>
			<view class="reorder-item-box" @click="toggleTab('selector')">
				<view class="reorder-item-left">预约店铺</view>
				<view class="reorder-item-right">
					<view class="order-item">{{orderShop}}</view>
					<uni-icon type="arrowright" size="20" color="#BEBEBE"></uni-icon>
				</view>
			</view>
			<view class="reorder-info-box">
				<view class="reorder-info-left address-left">店铺地址</view>
				<view class="reorder-info-right address-right">{{shopAddress}}</view>
			</view>
			<view class="reorder-info-box">
				<view class="reorder-info-left">店铺热线</view>
				<view class="reorder-info-right">{{shopTel}}</view>
			</view>
			<view class="reorder-info-box">
				<view class="reorder-info-left">预约件数</view>
				<view class="reorder-info-right">{{count}}</view>
			</view>
			<view class="reorder-info">
				<view class="info-left">信息备注</view>
				<view class="info-right">
					<textarea placeholder="请输入备注信息,无可不填写" v-model="remark" class="item-text"/>
				</view>
			</view>
		</scroll-view>
		<button type="primary" @click="orderSubmit" style="background-color: #02ABA4;" class="button_color">确认</button>
		<w-picker 
			mode="limit" 
			dayStep="3"
			startHour="9"
			endHour="17"
			minuteStep="5"
			afterStep="5"
			:defaultVal="[0,0,0]" 
			:current="true" 
			@confirm="onConfirm" 
			ref="limit" 
			themeColor="#3699FC"
		></w-picker>
		<w-picker 
			v-if="selectList.length!=0"
			mode="selector" 
			:defaultVal="[0]" 
			@confirm="onConfirm" 
			ref="selector" 
			themeColor="#3699FC"
			:selectList="selectList"
		></w-picker>
		<system></system>
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
	components: {
		wPicker,
		uniIcon
	},
	data() {
		return {
			height:0,
			fullAddress:"",
			userName:"",
			tel:"",
			addressList:false,
			orderTime:"请选择预约时间",
			orderShop:"请选择预约店铺",
			selectList:[],
			shopAddress:"",
			shopTel:"",
			shopNo:"",
			count:"",
			remark:"",
			time:""
		}
	},
	onNavigationBarButtonTap: function (){
		uni.reLaunch({
			url: "../laundry/laundry"
		});
	},
	onLoad:function(options){
		this.height = uni.getSystemInfoSync().windowHeight - 36;
		this.$showLoading();
		if(options.userName && options.address && options.tel){
			this.fullAddress = options.address+" " +options.addressDetails;
			this.userName = options.userName;
			this.tel = options.tel;
			this.$hideLoading();
		}else{
			this.getDefAddress();
		};
		this.getData();
		this.getShopList();
	},
	methods: {
		getDefAddress: function () {
			uni.request({
				url: this.apiServer + "userServer/cunUserServer/getDefaultAddress",
				method: 'POST',
				data: {
					OpenId: uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						if(!!res.data.data){
							let data = res.data.data;
							console.log(data)
							this.fullAddress = data.address + " " + data.addressDetails;
							this.userName = data.userName;
							this.tel = data.tel;
							this.addressList = false; // 有地址
						}else{
							this.addressList = true; // 无地址
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
					this.reconnect('../reserveorder/reserveorder',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			});
		},
		getData: function () {
			uni.request({
				url: this.apiServer + 'thingServer/openThingServer/getTeyClothes',
				method: 'POST',
				data: {
					teyKey: uni.getStorageSync("shopKey")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						let count = 0;
						for(let i=0;i<data.length;i++){
							count = count + parseInt(data[i].number);
						};
						this.count = count;
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
						title: "网络请求失败",
						duration: 2000,
						icon: "none"
					});
				}
			})
		},
		getShopList: function () {
			uni.request({
				url: this.apiServer + 'shopServer/openShopServer/getShopList',
				method: 'POST',
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						let shopList = [];
						for(let i=0;i<data.length;i++){
							shopList.push({label:data[i].shopName,value:data[i].shopNo});
						};
						this.selectList = shopList;
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
						title: "网络请求失败",
						duration: 2000,
						icon: "none"
					});
				}
			})
		},
		getShopData: function (No) {
			uni.request({
				url: this.apiServer + 'shopServer/openShopServer/getShopData',
				method: 'POST',
				data: {
					shopNo: No
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						this.shopAddress = res.data.data.shopAdd;
						this.shopTel = res.data.data.contectTel;
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
						title: "网络请求失败",
						duration: 2000,
						icon: "none"
					});
				}
			})
		},
		changeAddress: function () {
			uni.reLaunch({
				url:"../address/address?type=2"
			});
		},
		toggleTab: function (type) {
			this.mode = type;
			this.$refs[type].show();
		},
		onConfirm: function (val) {
			//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
			switch(this.mode){
				case "limit":
					this.orderTime = val.checkArr[0].value+" "+val.checkArr[1].value+":"+val.checkArr[2].value;
					break;
				case "selector":
					this.orderShop = val.result;
					this.shopNo = val.checkArr.value;
					this.getShopData(val.checkArr.value);
					break;
			};
		},
		orderSubmit: function () {
			if(!this.addressList){
				if(this.orderShop!="请选择预约店铺"){
					uni.request({
						url: this.apiServer + 'orderServer/cunOrderServer/createReservation',
						method: 'POST',
						data: {
							OpenId: uni.getStorageSync("openid"),
							userTel: this.tel,
							userAddress: this.fullAddress,
							userName: this.userName,
							teyClothesKey: uni.getStorageSync("shopKey"),
							shopNo: this.shopNo,
							number: this.count,
							arriveTime: this.orderTime,
							remark: this.remark
						},
						header: {
							'content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res);
							if(res.data.status === 200){
								uni.removeStorageSync("shopKey");
								uni.setStorageSync("orderNo", res.data.data);
								uni.reLaunch({
									url:"../ordersuccess/ordersuccess"
								});
							}else{
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									icon: "none"
								});
							};
						},
						fail: () => {
							uni.showToast({
								title: "网络请求失败",
								duration: 2000,
								icon: "none"
							});
						}
					});
				}else{
					uni.showToast({
						title: "请选择预约店铺",
						duration: 2000,
						icon: "none"
					});
				};
			}else{
				uni.showToast({
					title: "请选择地址",
					duration: 2000,
					icon: "none"
				});
			};
		}
	}
}
</script>

<style scoped>
#RESERVEORDER{
	background-color: #F4F4F4;
}
.reorder-box{
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	border-bottom: 1px solid #E3E3E3;
	padding: 10px 5px 10px 10px;
	margin-bottom: 10px;
}
.reorder-box-left{
	width: calc(100% - 30px);
}
.title-text{
	font-size: 0.9em;
}
.box-item-top{
	font-size: 0.9em;
	margin-bottom: 3px;
}
.box-item-bottom{
	display: flex;
	font-size: 0.7em;
	color: #A4A4A4;
}
.item-name{
	margin-right: 10px;
}
.reorder-item-box{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 0.8em;
	background-color: white;
	border-bottom: 1px solid #E3E3E3;
	padding: 8px 5px 8px 10px;
}
.top-border{
	border-top: 1px solid #E3E3E3;
}
.reorder-item-right{
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.reorder-info-box{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 0.8em;
	background-color: white;
	border-bottom: 1px solid #E3E3E3;
	padding: 8px 25px 8px 10px;
}
.address-left{
	width: 20%;
}
.address-right{
	width: 70%;
	text-align: right;
}
.reorder-info{
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	background-color: white;
	border-bottom: 1px solid #E3E3E3;
	padding: 8px 25px 8px 10px;
}
.info-left{
	width: 20%;
	font-size: 0.8em;
}
.info-right{
	width: 70%;
	text-align: right;
}
.item-text{
	width: 100%;
	height: 2.8em;
	font-size: 0.8em;
}
.button_color{
	height: 36px;
	line-height: 36px;
}
</style>
