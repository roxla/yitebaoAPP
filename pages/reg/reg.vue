<template>
	<view id="REG">
		<view class="reg_box">
			<view class="reg_logo">
				<avatar 
					selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="userImg" :noTab="true"
					avatarStyle="width: 100%;height: 100%;position: absolute;left: 0;border-radius: 100%;">
				</avatar>
			</view>
			<view class="reg_input_box">
				<view class="reg_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="phone-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入注册手机号码" class="Name" v-model="tel"/>
					</view>
				</view>
				<view class="reg_input reg_mail">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="email-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入短信验证码" class="Name" v-model="res"/>
					</view>
					<view class="uni_button">
						<button type="primary" :disabled="show" plain="true" size="mini" @click="getCode">{{codeName}}</button>
					</view>
				</view>
				<view class="reg_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="locked" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请设置6-20位新的登录密码" :password="true" class="Name" v-model="pwd"/>
					</view>
				</view>
				<view class="reg_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="locked" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请再次输入新的登录密码" :password="true" class="Name" v-model="repwd"/>
					</view>
				</view>
			</view>
			<view class="reg_rule">
				<label class="radio"><radio @click="ruleAccount()" style="transform:scale(0.8)"/></label>
				<view>同意《<navigator class="reg_rule_item" url="../rule/rule">用户服务协议</navigator>》</view>
			</view>
			<view class="reg_button">
				<button type="primary" style="background-color: #02ABA4;" class="button_color" @click="regAccount" :disabled="reg">注册</button>
			</view>
			<view class="reg_link">
				<navigator class="reg_link_item" open-type="reLaunch" :url="loginUrl">已有账户，立即登录</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue"
import avatar from "@/components/yq-avatar/yq-avatar.vue";
export default {
	components: {
		uniIcon,
		avatar
	},
	data() {
		return {
			userImg:'../../static/logo/head-portrait.png',
			rule:false,
			reg:true,
			loginUrl:"",
			tel:"",
			codeName:"发送验证码",
			count:"",
			timer:null,
			show:false,
			res:"",
			pwd:"",
			repwd:""
		}
	},
	onLoad: function (){
		let backpage = uni.getStorageSync("backpage");
		let backtype = uni.getStorageSync("backtype");
		this.loginUrl = "../login/login?backpage="+backpage+"&backtype="+backtype
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
		upUserImg: function () {
			uni.chooseImage({
				count: 1, //默认9
				success: function (res) {
					console.log(JSON.stringify(res.tempFilePaths));
				}
			});
		},
		ruleAccount: function () {
			this.rule = true;
			this.reg = false;
		},
		getCode: function (){
			const TIME_COUNT = 120;
			uni.request({
				url:this.apiServer + 'SMSServer/MDSMSServer/sendCodeMsg',
				method: 'POST',
				data:{
					tel:this.tel,
					msg:"衣特宝APP内"
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						if (!this.timer) {
							this.count = TIME_COUNT;
							this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.show = true;
								this.codeName = this.count + "秒";
								this.count--;
							} else {
								this.codeName = "发送验证码";
								clearInterval(this.timer);
								this.timer = null;
								this.show = false;
							}
							}, 1000);
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
		regAccount: function () {
			if(this.rule){
				if(this.pwd === this.repwd){
					uni.request({
						url:this.apiServer + 'userServer/openUserServer/registerUser',
						method: 'POST',
						data:{
							Tel:this.tel,
							code:this.res,
							Pwd:this.pwd
						},
						header: {
							'content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							if(res.data.status === 200){
								uni.showToast({
									title: "注册成功",
									duration: 2000,
									icon: "none"
								});
								setTimeout(function(){
									uni.navigateTo({
										url:"../login/login"
									});
								},2000);
							}else if(res.data.status === 500){
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									icon: "none"
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
						title: "两次密码不一致",
						duration: 2000,
						icon: "none"
					});
				};
			}
		},
		myUpload: function (rsp) {
			this.url = rsp.path; //更新头像方式一
		}
	}
}
</script>

<style>
#REG{
	height: 100vh;
	background-color: #F8F8F8;
}
.button_color{
	height: 36px;
	line-height: 36px;
}
.button_color[disabled]{
	background-color: rgba(1,170,163,.6);
}
.reg_logo{
	width: 45%;
	height: 0;
	padding-bottom: 45%;
	position: relative;
	margin: auto;
}
.reg_box{
	padding: 20px 5% 0px;
}
.reg_input_box{
	background-color: white;
	width: 100%;
	border: 1px solid #E3E3E3;
}
.reg_input{
	display: flex;
	width: 100%;
	padding: 10px 0px;
	border-bottom: 1px solid #E3E3E3;
}
.reg_input:last-of-type{
	border-bottom: 0px;
}
.uni_Icon{
	width: 30px;
	line-height: 25px;
	height: 25px;
	margin-left: 5px;
}
.uni_button{
	width: 90px;
	margin-right: 10px;
}
.uni_button button{
	width: 100%;
	font-size: 12px;
	padding: 0px;
	vertical-align: middle;
}
.uni_input{
	line-height: 30px;
	height: 30px;
	width: 100%;
}
.reg_mail .uni_input{
	width: calc(100% - 90px);
}
.uni_input input{
	line-height: 30px;
	height: 30px;
	font-size: 0.8em;
}
.reg_rule,.reg_button,.reg_link{
	margin-top: 6%;
}
.reg_rule{
	display: flex;
	font-size: 0.8em;
}
.reg_rule view{
	line-height: 24px;
}
.reg_rule_item{
	display: inline-block;
	color: #007AFF;
}
.reg_link_item{
	text-align: center;
	font-size: 0.8em;
	color: #007AFF;
}
</style>
