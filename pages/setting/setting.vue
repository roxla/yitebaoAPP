<template>
	<view id="SETTING">
		<scroll-view id="setting" scroll-y>
			<view class="set_box">
				<view class="set_title">基本资料</view>
				<view class="set_item_box">
					<view class="set_item set_link" @click="goInfoSet('../my_info/my_info')">
						<view class="set_item_text">个人资料</view>
						<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20" ></uni-icon>
					</view>
					<view class="set_item set_link" @click="goRouter('../pwd/pwd')">
						<view class="set_item_text">修改密码</view>
						<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20"></uni-icon>
					</view>
					<view class="set_item set_link" @click="goRouter('../tel/tel')">
						<view class="set_item_text" style="display: flex;">
							<view class="set_item_tel">更换手机号</view>
							<view class="set_item_num">{{userTel}}</view>
						</view>
						<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20" ></uni-icon>
					</view>
					<view class="set_item set_link" @click="goInfoSet('../address/address',1)">
						<view class="set_item_text">收货地址管理</view>
						<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20" ></uni-icon>
					</view>
					<view class="set_item set_link" @click="goRouter('../about/about')">
						<view class="set_item_text">关于我们</view>
						<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20" ></uni-icon>
					</view>
				</view>
			</view>
			<view class="set_box">
				<view class="set_title">隐私设置</view>
				<view class="set_item_box">
					<view class="set_item">
						<view class="set_item_info">消息推送</view>
						<switch :checked="check" @change="switchChange" style="transform:scale(0.8)"/>
					</view>
				</view>
			</view>
		</scroll-view>
		<view>
			<button type="warn" class="button_color" @click="loginOut">退 出 登 录</button>
		</view>
		<system></system>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
	components: {
		uniIcon,
	},
	data() {
		return {
			check:false,
			userTel:""
		}
	},
	onLoad: function () {
		let opid = this.checkLogin('../setting/setting',1);
		if(!!opid){
			this.$showLoading();
			if(!!uni.getStorageSync("userTel")){
				this.userTel = uni.getStorageSync("userTel");
			};
		};
	},
	onReady:function(){
		this.$hideLoading();
	},
	onNavigationBarButtonTap: function () {
		uni.switchTab({url:"../my/my"});
	},
	methods: {
		goRouter: function (url,type) {
			uni.navigateTo({
				url:url + "?type=" + type
			});
		},
		goInfoSet: function (url,type) {
			uni.reLaunch({
				url:url + "?type=" + type
			})
		},
		switchChange: function () {
			
		},
		loginOut: function () {
			this.$showModal({
				title: "是否确认退出？",
				content: "",
				confirmText: "确认",
				cancelText: "取消",
				callback: res => {
					if (res.confirm) {
						uni.request({
							url: this.apiServer + 'userServer/cunUserServer/loginExit',
							method: 'POST',
							data: {
								OpenId:uni.getStorageSync("openid")
							},
							header: {
								'content-Type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								if(res.data.status === 200){
									uni.clearStorageSync();
									uni.switchTab({url:"../my/my"});
								}else{
									uni.showToast({
										title: res.data.msg,
										duration: 2000,
										icon: "none"
									});
								}
							}
						});
					}
				}
			});
		}
	}
}
</script>

<style scoped>
#SETTING{
	background-color: #F4F4F4;
	height: 100vh;
}
#setting{
	padding: 5px 8px;
	height: calc(100vh - 46px);
	width: calc(100% - 16px);
}
.set_box{
	margin-bottom: 10px;
}
.set_title{
	font-size: 0.8em;
	padding: 3px;
	color: #9E9E9E;
}
.set_item_box{
	border: 1px solid #E3E3E3;
	border-radius: 5px;
	background-color: white;
	color: #808080;
}
.set_item{
	display: flex;
	border-bottom: 1px solid #E3E3E3;
	padding: 6px 3px;
	justify-content: space-between;
	align-items: center;
}
.set_link{
	padding: 11px 3px;
}
.set_item:last-of-type{
	border: 0px;
}
.set_item_text{
	font-size: 0.8em;
	padding-left: 6px;
	width: calc(100% - 20px);
}
.set_item_tel,.set_item_num{
	width: 50%;
}
.set_item_num{
	padding-right: 10px;
	text-align: right;
}
.set_item_info{
	font-size: 0.8em;
	padding-left: 6px;
	width: calc(100% - 65px);
}
.button_color{
	height: 36px;
	line-height: 36px;
	font-size: 0.9em;
	border-radius: 0px;
}
</style>
