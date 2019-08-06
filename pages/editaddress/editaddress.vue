<template>
	<view id="EDITADDRESS" :style="'height:'+height+'px'">
		<view class="editaddress-title">带有*的为必填项</view>
		<dl class="item-box">
			<dd class="item-left">联系人<text>*</text></dd>
			<dd class="item-right">
				<input class="item-input" maxlength="10" type="text" placeholder="请输入联系人姓名" v-model="userName"/>
			</dd>
		</dl>
		<dl class="item-box">
			<dd class="item-left">电话<text>*</text></dd>
			<dd class="item-right">
				<input class="item-input" maxlength="11" type="number" placeholder="请输入联系人电话" v-model="tel"/>
			</dd>
		</dl>
		<dl class="item-box-address">
			<dd class="item-address-left">
				<view class="item-left">地址<text>*</text></view>
				<textarea v-model="locationAddress" class="item-text"/>
			</dd>
			<dd @click="getAddress" class="item-address-right">
				<uni-icon type="location" size="24" color="#BEBEBE"></uni-icon>
			</dd>
		</dl>
		<dl class="item-box address-box">
			<dd class="item-left address-left">门牌号</dd>
			<dd class="item-right">
				<input class="item-input" type="text" placeholder="请输入门牌号" v-model="fullAddress"/>
			</dd>
		</dl>
		<view class="set-item">
			<view class="set-item-text">设为默认地址</view>
			<switch :checked="check" @change="switchChange" style="transform:scale(0.8)"/>
		</view>
		<view class="del-item" @click="delAddress()">删除该地址</view>
		<system></system>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			height: 0,
			userName:"",
			tel:"",
			locationAddress:"",
			def:false,
			fullAddress:"",
			// 纬度
			longitude:"",
			// 经度
			latitude:"",
			addressNo:"",
			check:false
		}
	},
	onLoad: function (options) {
		this.height = uni.getSystemInfoSync().windowHeight;
		this.userName = options.userName;
		this.tel = options.tel;
		this.locationAddress = options.address;
		this.fullAddress = options.addressDetails;
		this.def = options.def;
		this.longitude = options.lng;
		this.latitude = options.lat;
		this.addressNo = options.No;
		if(options.def == "true"){
			this.check = true;
		};
	},
	onNavigationBarButtonTap: function () {
		uni.request({
			url: this.apiServer + 'userServer/cunUserServer/changeUserAddress',
			method: 'POST',
			data: {
				addressNo: this.addressNo,
				OpenId: uni.getStorageSync("openid"),
				userTel: this.tel,
				userName: this.userName,
				address: this.locationAddress,
				addressDetails: this.fullAddress,
				lng: this.latitude,
				lat: this.longitude,
				isDefault: this.check
			},
			header: {
				'content-Type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				if(res.data.status === 200){
					uni.showToast({
						title: "地址编辑成功",
						duration: 2000,
						icon: "none"
					});
					setTimeout(function(){
						uni.reLaunch({
							url:"../address/address"
						});
					},2000);
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
			},
		})
	},
	methods: {
		getAddress: function () {
			uni.chooseLocation({
				success: (res) => {
					this.locationAddress = res.address;
					this.latitude = res.latitude;
					this.longitude = res.longitude;
				}
			});
		},
		switchChange: function (e) {
			this.check = e.detail.value;
		},
		delAddress: function () {
			this.$showModal({
				title: "是否删除该地址？",
				content: "",
				confirmText: "确认",
				cancelText: "取消",
				callback: res => {
					if (res.confirm) {
						uni.request({
							url: this.apiServer + 'userServer/cunUserServer/delUserAddress',
							method: 'POST',
							data: {
								OpenId: uni.getStorageSync("openid"),
								addressNo: this.addressNo
							},
							header: {
								'content-Type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								if(res.data.status === 200){
									uni.showToast({
										title: "地址删除成功",
										duration: 2000,
										icon: "none"
									});
									setTimeout(function(){
										uni.reLaunch({
											url:"../address/address"
										});
									},2000);
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
					};
				},
			})
		}
	}
}
</script>

<style scoped>
text{
	color: red;
}
#EDITADDRESS{
	background-color: #F4F4F4;
	color: #7F7F7F;
}
.editaddress-title{
	text-align: center;
	font-size: 0.8em;
	color: red;
	padding: 5px 0px;
}
.item-box{
	background-color: white;
	display: flex;
	padding: 6px 20px 6px 8px;
	align-items: center;
	border-bottom: 1px solid #E3E3E3;
}
.item-box:first-of-type{
	border-top: 1px solid #E3E3E3;
}
.item-left{
	font-size: 0.8em;
	font-weight: bold;
	width: 20%;
}
.item-right{
	width: 80%;
}
.item-input{
	font-size: 0.8em;
}
.item-text{
	padding-left: 4%;
	width: 100%;
	font-size: 0.8em;
	height: 2.8em;
}
.item-box-address{
	background-color: white;
	display: flex;
	padding: 5px 0px 5px 8px;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #E3E3E3;
}
.item-address-left{
	display: flex;
	width: calc(100% - 40px);
	align-items: flex-start;
}
.item-address-right{
	width: 40px;
	text-align: center;
}
.address-box{
	align-items: center;
}
.set-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
	margin-top: 15px;
	padding-left: 8px;
	font-size: 0.8em;
	font-weight: bold;
}
.del-item{
	background-color: white;
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
	margin-top: 15px;
	padding: 6px 0px 6px 8px;
	font-size: 0.8em;
	color: red;
}
</style>
