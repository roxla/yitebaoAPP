<template>
	<view id="MY_INFO" :style="'height:'+height+'px'">
		<view class="info_item_box">
			<view class="my_info_img">
				<avatar 
					selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="userImg" :noTab="true"
					avatarStyle="width: 100%;height: 100%;position: absolute;left: 0;border-radius: 100%;">
				</avatar>
			</view>
			<dl class="info_item">
				<dd class="info_item_left">昵称</dd>
				<dd class="info_item_right">
					<input type="text" style="font-size: 1em;" placeholder="请输入你想要的昵称" v-model="userName" />
				</dd>
			</dl>
			<dl class="info_item">
				<dd class="info_item_left">性别</dd>
				<dd class="info_item_right">
					<view class="result" @click="toggleTab('selector')">{{sex}}</view>
				</dd>
			</dl>
			<dl class="info_item">
				<dd class="info_item_left">生日</dd>
				<dd class="info_item_right">
					<view class="result" @click="toggleTab('date')">{{brith}}</view>
				</dd>
			</dl>
			<dl class="info_item address_box">
				<dd class="info_item_left">居住地址</dd>
				<dd class="info_item_right">
					<textarea v-model="province" placeholder="请输入您的居住地" class="address_info"/>
				</dd>
			</dl>
		</view>
		<view class="button_box">
			<button type="primary" class="button_color">确 认</button>
		</view>
		<w-picker 
			v-if="selectList.length!=0"
			mode="selector" 
			:defaultVal="[0]" 
			@confirm="onConfirm" 
			ref="selector" 
			themeColor="#3699FC"
			:selectList="selectList"
		></w-picker>
		<w-picker 
			mode="date" 
			:startYear="sYear" 
			:endYear="eYear"
			:current="true"
			@confirm="onConfirm" 
			ref="date" 
			themeColor="#3699FC"
		></w-picker>
		<system></system>
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
import avatar from "@/components/yq-avatar/yq-avatar.vue";
export default {
	components:{
		wPicker,
		avatar
	},
	data() {
		return {
			userImg: '../../static/logo/head-portrait.png',
			sYear: "",
			eYear: "",
			selectList: [{label:"男",value:"0"},{label:"女",value:"1"}],
			index: 0,
			mode: "",
			userName: "",
			sex: "请选择您的性别",
			brith: "请选择您的生日",
			province: "",
			height: 0
		}
	},
	onLoad:function(){
		this.height = uni.getSystemInfoSync().windowHeight - 17
		let opid = this.checkLogin('../setting/setting',1);
		if(!!opid){
			this.$showLoading();
			this.getData();
			this.getDate();
		}
	},
	onNavigationBarButtonTap: function () {
		uni.reLaunch({url:"../setting/setting"});
	},
	methods: {
		getData: function () {
			uni.request({
				url: this.apiServer + 'userServer/cunUserServer/getCunUserData',
				method: 'POST',
				data: {
					OpenId:uni.getStorageSync("openid")
				},
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if(res.data.status === 200) {
						if(!!res.data.data.name){
							this.userName = res.data.data.name;
						};
						if(!!res.data.data.sex){
							this.sex = res.data.data.sex;
						};
						if(!!res.data.data.birthday){
							this.brith = res.data.data.birthday;
						};
						if(!!res.data.data.userAdd){
							this.province = res.data.data.userAdd;
						}
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					};
				},
				fail: () => {
					this.reconnect('../my_info/myinfo',1);
				},
				complete: () => {
					this.$hideLoading();
				}
			})
		},
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
		getDate:function () {
			const date = new Date();
			let year = date.getFullYear();
			this.sYear = (year - 200).toFixed(0);
			this.eYear = (year + 200).toFixed(0);
		},
		toggleTab: function (type) {
			this.mode = type;
			this.$refs[type].show();
		},
		onConfirm: function (val) {
			//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
			switch(this.mode){
				case "date":
					this.brith = val.result;
					break;
				case "selector":
					this.sex = val.result;
					break;
			};
		},
		myUpload: function (rsp) {
			this.url = rsp.path; //更新头像方式一
		}
	}
}
</script>

<style scoped>
#MY_INFO{
	background-color: #F4F4F4;
	padding: 17px 0px 0px;
}
.my_info_img{
	width: 45%;
	height: 0;
	padding-bottom: 45%;
	position: relative;
	margin: 5px auto;
}
.info_item_box{
	margin: auto;
	width: 90%;
	background-color: white;
	border: 1px solid #E3E3E3;
}
.info_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 5%;
	border-bottom: 1px solid #E3E3E3;
	font-size: 0.8em;
}
.info_item:first-of-type{
	border-top: 1px solid #E3E3E3;
}
.info_item:last-of-type{
	border-bottom: 0px;
}
.info_item_right{
	text-align: right;
	color: #7F7F7F;
	width: 80%;
}
.button_box{
	margin:10px auto 0upx;
	width: 90%;
}
.button_color{
	background-color: #02ABA4;
	height: 36px;
	line-height: 36px;
}
.address_box{
	align-items: flex-start;
}
.address_info{
	width: 100%;
	height: 2.4em;
	font-size: 1em
}
</style>
