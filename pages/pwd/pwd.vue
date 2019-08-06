<template>
	<view id="PWD">
		<view class="nav_box">
			<view class="nav_item_left" :class="step ? 'nav_select' : ''">1.验证手机号码</view>
			<view class="nav_item_right" :class="!step ? 'nav_select' : ''">2.设置新密码</view>
		</view>
		<view class="pwd_tel" v-show="step">
			<view class="pwd_box">
				<view class="pwd_input bottom_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="phone-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入注册手机号码" class="Name" v-model="tel"/>
					</view>
				</view>
				<view class="pwd_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="email-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入短信验证码" class="Name" v-model="res"/>
					</view>
					<view class="uni_button">
						<button type="primary" plain="true" :disabled="show" size="mini" @click="getCode">{{codeName}}</button>
					</view>
				</view>
			</view>
			<view class="pwd_button">
				<button type="primary" class="button_color" @click="next()">下一步</button>
			</view>
		</view>
		<view class="pwd_change" v-show="!step">
			<view class="pwd_box">
				<view class="pwd_input bottom_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="locked" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input password placeholder="请设置6-20位新的登录密码" class="Name" v-model="newPW"/>
					</view>
				</view>
				<view class="pwd_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="locked" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input password placeholder="请再次输入新的登录密码" class="Name" v-model="reNewPW"/>
					</view>
				</view>
			</view>
			<view class="pwd_button">
				<button type="primary" class="button_color" @click="changePwd()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue"
export default {
	components: {uniIcon},
	data() {
		return {
			step:true,
			codeName:"发送验证码",
			show:false,
			tel:"",
			res:"",
			newPW:"",
			reNewPW:""
		}
	},
	methods: {
		getCode: function () {
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
		next: function () {
			uni.request({
				url: this.apiServer + 'SMSServer/MDSMSServer/checkSMSCode',
				method: 'POST',
				data: {
					tel: this.tel,
					code: this.res
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success : (res) => {
					if(res.data.status === 200){
						this.step = false;
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
		},
		changePwd: function () {
			if(this.newPW == this.reNewPW){
				uni.request({
					url: this.apiServer + 'userServer/openUserServer/changePwd',
					method: 'POST',
					data: {
						pwd: this.newPW,
						tel: this.tel,
						code: this.res
					},
					header: {
						'content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if(res.data.status === 200){
							uni.showToast({
								title: "密码修改成功",
								duration: 2000,
								icon: "none"
							});
							setTimeout(function(){
								uni.clearStorageSync();
								uni.reLaunch({
									url:"../login/login?backpage=../my/my&backtype=2"
								});
							},2000);
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon: "none"
							});
						};
					}
				});
			}else{
				uni.showToast({
					title: "两次密码输入不一致",
					duration: 2000,
					icon: "none"
				});
			}
			console.log(this.tel);
			console.log(this.res);
		}
	}
}
</script>

<style scoped>
#PWD{
	height: 100vh;
	background-color: #F8F8F8;
}
.button_color{
	background-color: #02ABA4;
	height: 36px;
	line-height: 36px;
}
.nav_box{
	background-color: white;
	display: flex;
	border-bottom: 1px solid #F7F7F7;
	border-top: 1px solid #F7F7F7;
}
.nav_item_left,.nav_item_right{
	width: 50%;
	text-align: center;
	font-size: 0.8em;
	color: #9999B2;
	padding: 10px 0px;
}
.nav_item_left{
	background-image: url(../../static/tel_change/u1380.png);
	background-position: 100%;
}
.nav_select{
	color: #007AFF;
}
.pwd_tel,.pwd_change{
	padding: 20px 5% 0px;
}
.pwd_box{
	background-color: white;
	width: 100%;
	border: 1px solid #E3E3E3;
}
.pwd_input{
	display: flex;
	width: 100%;
	padding: 10px 0px;
}
.bottom_input{
	border-bottom: 1px solid #E3E3E3;
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
.pwd_tel .uni_input{
	width: calc(100% - 90px);
}
.uni_input input{
	line-height: 30px;
	height: 30px;
	font-size: 0.8em;
}
.pwd_button{
	margin-top: 6%;
}
</style>
