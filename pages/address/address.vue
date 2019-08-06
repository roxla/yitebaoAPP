<template>
	<view id="ADDRESS">
		<scroll-view scroll-y :style="'height:'+height+'px'">
			<view class="address-blank" v-if="addressData.length==0">地址列表为空</view>
			<view class="address-box" v-for="(item,index) in addressData" :key="index">
				<view class="item-box" @click="goAddress(item)">
					<view class="item-user-box">
						<view class="item-name">{{item.userName}}</view>
						<view class="item-tel">{{item.tel}}</view>
					</view>
					<view class="item-address"><text :class="def==index?'':'hide'" class="default-item">默认</text>{{item.address+' '+item.addressDetails}}</view>
				</view>
				<view class="item-edit" @click="editAddress(item)">编辑</view>
			</view>
		</scroll-view>
		<button type="primary" style="background-color: #02ABA4;" @click="pushAddress" class="button_color">新增地址</button>
		<system></system>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressData:[],
			height:0,
			def:0
		}
	},
	onLoad: function (options) {
		this.$showLoading();
		this.height = uni.getSystemInfoSync().windowHeight - 36;
		if(!!options.type){
			uni.setStorageSync("addressType",options.type);
		};
		this.getAllData();
	},
	onNavigationBarButtonTap: function (){
		let addressType = uni.getStorageSync("addressType");
		if(addressType == 2){
			uni.reLaunch({
				url: "../reserveorder/reserveorder"
			});
		}else{
			uni.reLaunch({
				url: "../setting/setting"
			});
		}
	},
	methods: {
		getAllData: function () {
			uni.request({
				url: this.apiServer + "userServer/cunUserServer/getUserAddress",
				method: 'POST',
				data: {
					OpenId: uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						this.addressData = res.data.data;
						this.getDefaultAddrss(res.data.data);
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: () => {
					this.reconnect('../address/address',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
		getDefaultAddrss: function (data) {
			uni.request({
				url: this.apiServer + "userServer/cunUserServer/getCunUserData",
				method: 'POST',
				data: {
					OpenId: uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let addrNo = res.data.data.fkdefAddrNo;
						for(let i=0;i<data.length;i++){
							if(data[i].addressNo == addrNo){
								this.def = i;
								data[i].def = true;
							}else{
								data[i].def = false;
							}
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
						title: "网络请求失败",
						duration: 2000,
						icon: "none"
					});
				}
			})
		},
		goAddress: function (data) {
			let addressType = uni.getStorageSync("addressType");
			if(addressType == 2){
				uni.reLaunch({
					url:"../reserveorder/reserveorder?tel="+data.tel
					+"&userName="+data.userName
					+"&address="+data.address
					+"&addressDetails="+data.addressDetails
				});
			};
		},
		editAddress: function (data) {
			uni.navigateTo({
				url:"../editaddress/editaddress?def="+data.def
				+"&address="+data.address
				+"&addressDetails="+data.addressDetails
				+"&tel="+data.tel
				+"&userName="+data.userName
				+"&lng="+data.lat
				+"&lat="+data.lng
				+"&No="+data.addressNo
			});
		},
		pushAddress: function () {
			uni.navigateTo({
				url:"../pushaddress/pushaddress"
			});
		}
	}
}
</script>

<style scoped>
#ADDRESS{
	background-color: #F4F4F4;
}
.address-blank{
	padding: 8px 10px;
	text-align: center;
}
.address-box{
	background-color: white;
	font-size: 0.7em;
	padding: 8px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.item-box{
	width: 82%;
}
.item-edit{
	width: 15%;
	text-align: right;
	border-left: 1px solid #E1E1E1;
	color: #B0B0B0;
}
.item-user-box{
	display: flex;
	align-items: flex-end;
	margin-bottom: 3px;
}
.item-name{
	font-size: 1.2em;
	margin-right: 5px;
}
.item-tel{
	color: #B0B0B0;
}
.default-item{
	padding: 0px 3px;
	margin-right: 3px;
	color: #FD5C26;
	background-color: rgba(253,92,38,0.3);
	font-size: 0.6em;
	text-align: center;
}
.hide{
	display: none;
}
.button_color{
	height: 36px;
	line-height: 36px;
}
</style>
