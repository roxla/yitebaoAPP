<template>
	<view id="Login">
		<view class="login_logo">
			<image class="login_logo_img" src="../../static/logo/u10410.png" mode="aspectFit"></image>
		</view>
		<view class="login_box">
			<view class="login_input bottom_input">
				<view class="icon_box">
					<uni-icon class="uni_Icon" type="phone-filled" color="#999" size="25"></uni-icon>
				</view>
				<view class="uni_input">
					<input v-model="loginTel" placeholder="手机号码" class="Name"/>
				</view>
			</view>
			<view class="login_input">
				<view class="icon_box">
					<uni-icon class="uni_Icon" type="locked" color="#999" size="25"></uni-icon>
				</view>
				<view class="uni_input">
					<input placeholder="登录密码" :password="showPassword" v-model="loginPW" class="PW"/>
				</view>
				<view class="icon_box">
					<uni-icon style="margin-right: 13px;" class="uni_Icon" type="eye" color="#999" size="25" @click="changePassword" :class="[!showPassword ? 'uni-active' : '']"></uni-icon>
				</view>
			</view>
		</view>
		<view class="login_button">
			<button type="primary" class="button_color" @click="login()">登录</button>
		</view>
		<view class="login_item_box">
			<navigator open-type="reLaunch" class="login_item" url="../reg/reg">注册新用户</navigator>
			<navigator class="login_item" url="../pwd/pwd">找回密码</navigator>
		</view>
		<view class="login_link_box">
			<view class="login_link_text">
				<text>其他登录方式</text>
			</view>
			<view class="longin_link">
				<view class="link_img">
					<image src="../../static/login_other/qq.png" @click="linkLogin('qq')"></image>
				</view>
				<view class="link_img">
					<image src="../../static/login_other/weixin.png" @click="linkLogin('weixin')"></image>
				</view>
				<view class="link_img">
					<image src="../../static/login_other/sinaweibo.png" @click="linkLogin('sinaweibo')"></image>
				</view>
			</view>
		</view>
		<system></system>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue"
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			loginTel:"",
			loginPW:"",
			showPassword: true,
		}
	},
	onLoad: function (options) {
		uni.setStorageSync("backpage",options.backpage);
		uni.setStorageSync("backtype",options.backtype);
	},
	onNavigationBarButtonTap: function () {
		// let backpage = uni.getStorageSync("backpage");
		// let backtype = uni.getStorageSync("backtype");
		// if(backtype == 1){
		// 	uni.redirectTo({url:backpage});
		// }else{
		// 	uni.switchTab({url:backpage});
		// }
		uni.switchTab({url:"../my/my"});
	},
	methods: {
		changePassword: function() {
			this.showPassword = !this.showPassword;
		},
		linkLogin: function(link) {
			switch(link){
				case 'qq':
					console.log("1");
					break;
				case 'weixin':
					console.log("2");
					break;
				default:
					console.log("3");
			}
		},
		login: function() {
			uni.request({
				url: this.apiServer + 'userServer/openUserServer/userLogin',
				method: 'POST',
				data: {
					Tel:this.loginTel,
					Pwd:this.loginPW,
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						this.loginTel = "";
						this.loginPW = "";
						uni.setStorageSync("openid",res.data.data);
						let backpage = uni.getStorageSync("backpage");
						let backtype = uni.getStorageSync("backtype");
						if(backtype == 1){
							uni.redirectTo({url:backpage});
						}else{
							uni.switchTab({url:backpage});
						}
					}
					else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
				},
				fail: (err) => {
					this.reconnect('../login/login',1);
				}
			})
		}
	}
}
</script>

<style scoped>
#Login{
	height: calc(100vh - 20px);
	padding: 20px 5% 0px;
	background-color: #F8F8F8;
}
.button_color{
	background-color: #02ABA4;
	height: 36px;
	line-height: 36px;
}
.login_logo{
	width: 50%;
	height: 0;
	padding-bottom: 50%;
	position: relative;
	margin: auto;
}
.login_logo_img{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.login_box{
	background-color: white;
	width: 100%;
	border: 1px solid #E3E3E3;
	margin: 15px auto 0px;
}
.bottom_input{
	border-bottom: 1px solid #E3E3E3;
}
.login_input{
	display: flex;
	width: 100%;
	padding: 10px 0px;
}
.uni_Icon{
	width: 30px;
	line-height: 25px;
	height: 25px;
	margin-left: 5px;
}
.uni_input{
	line-height: 30px;
	height: 30px;
	width: 100%;
}
.uni_input input{
	line-height: 30px;
	height: 30px;
	font-size: 0.8em;
}
.login_button{
	margin-top: 6%;
}
.login_item_box{
	margin-top: 10%;
	display: flex;
}
.login_item{
	width: 50%;
	text-align: center;
	color: #007AFF;
	font-size: 0.9em;
	-webkit-tap-highlight-color: rgba(255,255,255,0);
}
.login_link_box{
	margin-top: 8%;
}
.login_link_text{
	margin-bottom: 15px;
	font-size: 0.8em;
	text-align: center;
	color: #BFBFBF;
}
.longin_link{
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
}
.link_img{
	width: 100upx;
	height: 100upx;
	border: 1upx solid #dddddd;
	border-radius: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
}
.link_img image{
	width: 60upx;
	height: 60upx;
	margin: 20upx;
}
</style>
