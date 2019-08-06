<template>
	<view id="LAUNDRY">
		<system></system>
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="categoryActive==item.typeNo?'active':''"
				    v-for="(item,index) in categoryList">
					{{item.typeName}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<view class="right-item-box">
						<view class="item-box">
							<view class="img-box">
								<image :src="item.ImageUrl" />
							</view>
							<view>
								<view class="right-item-text">{{item.clotheName}}</view>
								<view class="right-item-cost">{{item.Price}}</view>
							</view>
						</view>
						<view class="plus-button">
							<view class="button-box">
								<view :class="item.num==0?'hide':''">
									<uni-icon class="uni_Icon" type="minus" color="#1067FD" size="22" @click="lessShop(item,index);"></uni-icon>
								</view>
								<view class="button-num" :class="item.num==0?'hide':''">
									<input type="number" v-model="item.num" :disabled="true"/>
								</view>
								<view>
									<uni-icon class="uni_Icon" type="plus" color="#1067FD" size="22" @click="plusShop(item,index);"></uni-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="page-footer" :class="footerType==true?'':'hide'">
			<view class="page-footer-left">
				<view class="footer-img" @click="showShop()">
					<image src="../../static/laundry/u2169.png"></image>
				</view>
				<view class="footer-text">
					<view class="footer-text-main" :class="count==0?'':'hide'">未选择衣物</view>
					<view class="footer-text-main" :class="count==0?'hide':''">数量：{{count}}件</view>
					<view class="footer-text-side">可到店自取衣物</view>
				</view>
			</view>
			<view class="page-footer-right">
				<button type="primary" class="button_color" style="background-color: #02ABA4;" @click="submitData">去预约</button>
			</view>
		</view>
		<!-- 弹窗 -->
		<popup-layer ref="popupRef" direction="top">
			<view class="shop-title">
				<view class="shop-title-left">已选物件</view>
				<view class="shop-title-right" @click="delPopup">
					<view class="title-item-icon">
						<uni-icon class="uni_Icon" type="trash" color="#B0B0B0" size="19"></uni-icon>
					</view>
					<view class="title-item-text">清空</view>
				</view>
			</view>
			<view class="shop-box">
				<view class="shop-item" v-for="(item,index) in shopList" :key="index">
					<view class="shop-item-left">{{item.clothesName}}</view>
					<view class="shop-item-right">
						<view>
							<uni-icon class="uni_Icon" @click="lessPopup(item,index)" type="minus" color="#1067FD" size="20"></uni-icon>
						</view>
						<view class="shop-button-num">
							<input type="number" v-model="item.number" :disabled="true"/>
						</view>
						<view>
							<uni-icon class="uni_Icon" @click="plusPopup(item,index)" type="plus" color="#1067FD" size="20"></uni-icon>
						</view>
					</view>
				</view>
			</view>
		</popup-layer>
		<!-- 清空 -->
		<view class="del-background" :class="delType==true?'':'hide'">
			<view class="del-box" :class="delType==true?'':'hide'">
				<view class="del-title">是否清空？</view>
				<view class="del-button-box">
					<button type="default" @click="delAllShop(2)">取消</button>
					<button type="primary" style="background-color: #01AAA3;" @click="delAllShop(1)">清空</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
import popupLayer from '@/components/popup-layer/popup-layer.vue';
export default {
	components: {
		uniIcon,
		popupLayer
	},
	watch:{
		count: function (val) {
			if(val === 0){
				this.$refs.popupRef.close();
			}
		},
		immediate: true,
		deep: true
	},
	data() {
		return {
			categoryList: [],
			subCategoryList: [],
			shopList: [],
			count: 0,
			delType: false,
			footerType: false,
			height: 0,
			categoryActive: "0001",
			scrollTop: 0,
			scrollHeight: 0,
			itemIndex: 0
		}
	},
	onLoad: function(options) {
		this.height = uni.getSystemInfoSync().windowHeight - 45;
		this.$showLoading();
		this.getShopList(options.typeNo);
		this.categoryClickMain(options, options.index);
	},
	onNavigationBarButtonTap: function () {
		this.backPage();
	},
	methods: {
		getShopList: function (no) {
			let shopKey = uni.getStorageSync("shopKey");
			if(!!shopKey){
				uni.request({
					url: this.apiServer + 'thingServer/openThingServer/getTeyClothes',
					method: 'POST',
					data: {
						teyKey: shopKey
					},
					header: {
						'content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if(res.data.status === 200){
							let data = res.data.data;
							if(!!data){
								this.shopList = data;
								let count = 0;
								for(let i=0;i<data.length;i++){
									count = count + parseInt(data[i].number);
								};
								this.count = count;
							}else{
								this.shopList = [];
							}
							this.getAllData(no);
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon: "none"
							});
						};
					},
					fail: () => {
						this.reconnect('../laundry/laundry',1);
					},
					complete: () => {
						this.footerType = true;
						this.$hideLoading();
					}
				});
			}else{
				this.getAllData();
				this.footerType = true;
				this.$hideLoading();
			}
		},
		scroll: function (e) {
			this.scrollHeight = e.detail.scrollHeight;
		},
		categoryClickMain: function (categroy, index) {
			if(!!categroy.typeNo){
				this.categoryActive = categroy.typeNo;
				this.itemIndex = index;
				this.getAllShop(categroy.typeNo);
				this.scrollTop = -this.scrollHeight * index;
			}else{
				let typeNo = uni.getStorageSync('categoryNo',this.categoryActive);
				let itemI = uni.getStorageSync('itemIndex',this.itemIndex);
				this.categoryActive = typeNo;
				this.itemIndex = itemI;
				this.getAllShop(typeNo);
				this.scrollTop = -this.scrollHeight * itemI;
			};
		},
		getAllData: function (no) {
			uni.request({
				url: this.apiServer + 'thingServer/openThingServer/getClothesType',
				method: 'POST',
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						this.categoryList = res.data.data;
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					};
				}
			})
		},
		getAllShop: function (typeNo) {
			uni.request({
				url: this.apiServer + 'thingServer/openThingServer/getClothes',
				method: 'POST',
				data: {
					typeNo: typeNo
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						let data = res.data.data;
						for(let i=0;i<data.length;i++){
							if(!data[i].ImageUrl){
								data[i].ImageUrl = "../../static/logo/u10410.png"
							};
							data[i].num = 0;
						};
						let shopList = this.shopList;
						if(shopList.length != 0){
							for(let j=0;j<shopList.length;j++){
								for(let k=0;k<data.length;k++){
									if(shopList[j].clothesNo == data[k].clotheNo){
										data[k].num = shopList[j].number;
									};
								};
							};
						}else{
							for(let i=0;i<data.length;i++){
								data[i].num = 0;
							};
						};
						this.subCategoryList = data;
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
		plusShop: function (data,index) {
			data.num = parseInt(data.num) + 1;
			this.count = parseInt(this.count) + 1;
			let shopList = this.shopList;
			let flag = true;
			let Index;
			if(shopList != 0){
				for(let i=0;i<shopList.length;i++){
					if(shopList[i].clothesNo == data.clotheNo){
						flag = false;
						Index = i;
						break;
					}
				};
				if(flag){
					this.shopList.push({"clothesNo":data.clotheNo,"clothesName":data.clotheName,"number":data.num});
				}else{
					this.shopList[Index].number = data.num;
				};
			}else{
				this.shopList.push({"clothesNo":data.clotheNo,"clothesName":data.clotheName,"number":data.num});
			};
		},
		lessShop: function (data,index) {
			data.num = parseInt(data.num) - 1;
			this.count = parseInt(this.count) - 1;
			for(let i=0;i<this.shopList.length;i++){
				if(this.shopList[i].clothesNo == data.clotheNo){
					if(this.shopList[i].number == 1){
						this.shopList.splice(i,1);
						break;
					}else{
						this.shopList[i].number = data.num;
						break;
					}
				};
			};
		},
		showShop: function () {
			if(this.count != 0){
				this.$refs.popupRef.show();
			}
		},
		backPage: function () {
			let shopKey = uni.getStorageSync("shopKey");
			if(!shopKey){
				shopKey = "";
			};
			uni.request({
				url: this.apiServer + 'thingServer/openThingServer/temporaryClothes',
				method: 'POST',
				data: {
					teyKey:shopKey,
					data:JSON.stringify(this.shopList)
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						uni.setStorageSync("shopKey",res.data.data);
						uni.switchTab({url:"../index/index"});
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
		lessPopup: function (data,index) {
			if(data.number != 1){
				data.number = parseInt(data.number) - 1;
				this.getAllShop(this.categoryActive);
			}else{
				this.shopList.splice(index,1);
				this.getAllShop(this.categoryActive);
			}
			this.count = parseInt(this.count) - 1;
		},
		delPopup: function () {
			this.delType = true;
		},
		delAllShop: function (type) {
			if(type == 1){
				this.shopList = [];
				this.count = 0;
				this.getAllShop(this.categoryActive);
				this.delType = false;
			}else{
				this.delType = false;
			}
		},
		plusPopup: function (data,index) {
			data.number = parseInt(data.number) + 1;
			this.count = parseInt(this.count) + 1;
			this.getAllShop(this.categoryActive);
		},
		submitData: function () {
			let shopKey = uni.getStorageSync("shopKey");
			if(!shopKey){
				shopKey = "";
			};
			if(this.count != 0){
				uni.request({
					url: this.apiServer + 'thingServer/openThingServer/temporaryClothes',
					method: 'POST',
					data: {
						teyKey:shopKey,
						data:JSON.stringify(this.shopList)
					},
					header: {
						'content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if(res.data.status === 200){
							uni.setStorageSync("shopKey",res.data.data);
							uni.setStorageSync('categoryNo',this.categoryActive);
							uni.setStorageSync('itemIndex',this.itemIndex);
							this.checkLogin('../laundry/laundry',1);
							uni.reLaunch({
								url:'../reserveorder/reserveorder'
							});
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon: "none"
							});
						}
					}
				});
			}else{
				uni.showToast({
					title: "请去选择物件",
					duration: 2000,
					icon: "none"
				});
			};
		}
	}
}
</script>

<style>
#LAUNDRY{
	background-color: #F4F4F4;
}
.page-body{
	display: flex;
	height: calc(100vh - 45px);
}
.nav{
	display: flex;
	width: 100%;
}
.nav-left{
	width: 20%;
}
.nav-left-item{
	height: 100upx;
	border-right: solid 1px #E0E0E0;
	border-bottom: solid 1px #E0E0E0;
	font-size: 30upx;
	font-weight: bold;
	color: #9898A5;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
}
.nav-right{
	width: 80%;
}
.nav-right-item{
	display: flex;
	align-items: center;
	padding: 0px 3% 4%;
}
.nav-right-item:first-of-type{
	padding-top: 4%;
}
.right-item-box{
	border: 1px solid #E9E9E9;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 2%;
	background-color: white;
}
.item-box{
	display: flex;
	align-items: center;
	width: 100%;
}
.img-box{
	width: 30%;
	height: 0px;
	padding-bottom: 30%;
	position: relative;
	margin-right: 5px;
}
.img-box image{
	width: 100%;
	height: 100%;
	position: absolute;
}
.right-item-text{
	font-size: 0.9em;
	color: #999999;
	margin-bottom: 3px;
}
.right-item-cost{
	color: red;
	font-weight: bold;
	font-size: 0.8em;
	margin-bottom: 5px;
}
.plus-button{
	position: relative;
}
.button-box{
	display: flex;
	align-items: center;
	position: absolute;
	z-index: 1024;
	right: 0;
	bottom: 0;
}
.button-num{
	width: 35px;
	text-align: center;
}
.active{
	color: #007AFF;
	border-left: 4px solid #007AFF;
}
.page-footer{
	display: flex;
	position: relative;
	z-index: 9999999;
}
.page-footer-left{
	width: 70%;
	background-color: rgb(53,53,53);
	display: flex;
	position: relative;
}
.page-footer-right{
	width: 30%;
}
.footer-img{
	width: 52px;
	height: 52px;
	position: absolute;
	bottom: 6px;
	left: 16px;
	z-index: 1024;
}
.footer-img image{
	width: 100%;
	height: 100%;
}
.footer-text{
	margin-left: 70px;
	color: white;
}
.footer-text-main{
	margin-top: 2px;
	font-size: 15px;
	font-weight: bold;
}
.footer-text-side{
	font-size: 13px;
}
.button_color{
	height: 45px;
	line-height: 45px;
	border-radius: 0px;
	font-size: 16px;
	font-weight: bold;
}
.shop-box{
	margin-bottom: 55px;
	max-height: 30vh;
	overflow-y: scroll;
}
.shop-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px 5px 10px;
	color: #B0B0B0;
}
.shop-title-left{
	font-size: 16px;
}
.shop-title-right{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 14px;
}
.shop-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px 3px 10px;
	font-size: 15px;
}
.shop-item-right{
	display: flex;
	align-items: center;
}
.shop-button-num{
	width: 30px;
	text-align: center;
}
.del-background{
	
	position: absolute;
	top: 0;
	z-index: 9999999;
	height: 100%;
	width: 100%;
}
.del-box{
	border-radius: 4px;
	font-size: 35upx;
	width: 60%;
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
	background-color: white;
}
.del-title{
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	font-size: 32upx;
	padding: 0 30upx;
}
.del-button-box{
	width: 100%;
	display: flex;
}
.del-button-box button{
	flex: 1;
	margin: 0;
	height: 68upx;
	line-height: 68upx;
	border-radius: 0;
	padding: 0;
	text-align: center;
	font-size: 30upx;
}
.hide{
	display: none;
}
</style>
