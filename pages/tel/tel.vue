<template>
	<view id="TEL">
		<view class="nav_box">
			<view class="nav_item_left" :class="step ? 'nav_select' : ''">1.验证手机号码</view>
			<view class="nav_item_right" :class="!step ? 'nav_select' : ''">2.设置新手机号码</view>
		</view>
		<view class="tel_tel" v-show="step">
			<view class="tel_box">
				<view class="tel_input bottom_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="phone-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入注册手机号码" class="Name" v-model="tel"/>
					</view>
				</view>
				<view class="tel_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="email-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入短信验证码" class="Name" v-model="res"/>
					</view>
					<view class="uni_button">
						<button type="primary" plain="true" :disabled="show" size="mini" @click="getCode()">{{codeName}}</button>
					</view>
				</view>
			</view>
			<view class="tel_button">
				<button type="primary" class="button_color" @click="next()">下一步</button>
			</view>
		</view>
		<view class="tel_tel" v-show="!step">
			<view class="tel_box">
				<view class="tel_input bottom_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="phone-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入新手机号码" class="Name" v-model="newtel"/>
					</view>
				</view>
				<view class="tel_input">
					<view class="icon_box">
						<uni-icon class="uni_Icon" type="email-filled" color="#999" size="25"></uni-icon>
					</view>
					<view class="uni_input">
						<input placeholder="请输入短信验证码" class="Name" v-model="newres"/>
					</view>
					<view class="uni_button">
						<button type="primary" plain="true" :disabled="newShow" size="mini" @click="getCodeAgain()">{{newCodeName}}</button>
					</view>
				</view>
			</view>
			<view class="tel_button">
				<button type="primary" class="button_color" @click="postNewTel">提交</button>
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
			newCodeName:"发送验证码",
			newShow:false,
			newtel:"",
			newres:""
		}
	},
	onLoad: function () {
		if(!!uni.getStorageSync("userTel")){
			this.tel = uni.getStorageSync("userTel");
		};
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
				},
				fail: () => {
					uni.showToast({
						title: '网络请求失败',
						duration: 2000,
						icon: "none"
					});
				}
			});
		},
		next: function () {
			uni.request({
				url:this.apiServer + 'SMSServer/MDSMSServer/checkSMSCode',
				method: 'POST',
				data:{
					tel: this.tel,
					code: this.res
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						this.step = false;
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
						title: '网络请求失败',
						duration: 2000,
						icon: "none"
					});
				}
			})
		},
		getCodeAgain: function () {
			const TIME_COUNT = 120;
			uni.request({
				url: this.apiServer + 'SMSServer/MDSMSServer/sendCodeMsg',
				method: 'POST',
				data:{
					tel:this.newtel,
					msg:"衣特宝APP内"
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						if (!this.newTimer) {
							this.count = TIME_COUNT;
							this.newtimer = setInterval(() => {
								if (this.count > 0 && this.count <= TIME_COUNT) {
									this.newShow = true;
									this.newCodeName = this.count + "秒";
									this.count--;
								} else {
									this.newCodeName = "发送验证码";
									clearInterval(this.newtimer);
									this.timer = null;
									this.newShow = false;
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
				},
				fail: () => {
					uni.showToast({
						title: '网络请求失败',
						duration: 2000,
						icon: "none"
					});
				}
			});
		},
		postNewTel: function () {
			uni.request({
				url:this.apiServer + 'userServer/consumerManage/codeChangeConsumerTel',
				method: 'POST',
				data:{
					changeTel: this.newtel,
					oldTel: this.tel,
					code: this.newres,
					OpenId: uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200){
						uni.showToast({
							title: "手机号码修改成功",
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
					}
				},
				fail: () => {
					uni.showToast({
						title: '网络请求失败',
						duration: 2000,
						icon: "none"
					});
				}
			});
		}
	}
}
</script>

<style scoped>
#TEL{
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
.tel_tel{
	padding: 20px 5% 0px;
}
.tel_box{
	background-color: white;
	width: 100%;
	border: 1px solid #E3E3E3;
}
.tel_input{
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
.tel_tel .uni_input{
	width: calc(100% - 90px);
}
.uni_input input{
	line-height: 30px;
	height: 30px;
	font-size: 0.8em;
}
.tel_button{
	margin-top: 6%;
}
</style>
