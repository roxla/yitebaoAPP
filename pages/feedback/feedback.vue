<template>
	<view id="FEEDBACK">
		<view class="feedback_type_box" @click="toggleTab('selector')">
			<view class="feedback_type">{{type}}</view>
			<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20" ></uni-icon>
		</view>
		<view class="feedback_text_box">
			<textarea maxlength="300" class="feedback_text" v-model="feedText" placeholder="请输入反馈信息" />
			<view class="feedback_text_tip">已输入{{textNum}}/300</view>
		</view>
		<view class="feedback_tel_box">
			<input type="text" class="userName" placeholder="手机/邮箱/QQ(选填)" />
		</view>
		<view class="feedback_img_box">
			<view class="img_text_box">
				<view class="">图片上传</view>
				<view class="">{{imgList.length}}/4</view>
			</view>
			<view class="feedback_img">
				<view class="img_box" v-for="(item,index) in imgList" :key="index" @click="viewImage" :data-url="imgList[index]">
					<image class="feed_img" :src="imgList[index]" mode="aspectFill"></image>
					<view class="close_box" :data-index="index" @click.stop="delImg">
						<uni-icon class="uni_close" type="closeempty" color="#FFFFFF" size="20"></uni-icon>
					</view>
				</view>
				<view class="img_blank" @click="chooseImage" v-if="imgList.length<4">
					<uni-icon class="uni_Icon" type="camera" color="#999" size="30" ></uni-icon>
				</view>
			</view>
		</view>
		<view class="login_button">
			<button type="primary" class="button_color" @click="upData" style="background-color: #02ABA4;">提交</button>
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
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
	components:{
		uniIcon,
		wPicker
	},
	data() {
		return {
			type:"选择反馈类型",
			selectList:[
				{
					label:"商品相关",
					value:"0",
				},
				{
					label:"物流状况",
					value:"1",
				},
				{
					label:"客户服务",
					value:"2",
				},
				{
					label:"优惠活动",
					value:"3",
				},
				{
					label:"产品体验",
					value:"4",
				},
				{
					label:"产品功能",
					value:"5",
				},
				{
					label:"其他问题",
					value:"6",
				}
			],
			textNum:0,
			feedText:"",
			imgList: []
		}
	},
	onLoad: function () {
		this.checkLogin('../feedback/feedback',1);
	},
	onNavigationBarButtonTap: function () {
		uni.switchTab({url:"../my/my"});
	},
	watch: {
		feedText(val){
			this.textNum = this.feedText.length
		},
		immediate: true,
		deep: true
	},
	methods: {
		toggleTab: function () {
			this.$refs.selector.show();
		},
		onConfirm: function (val) {
			console.log(val);
			this.type = val.result;
			//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
		},
		chooseImage: function () {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths)
					} else {
						this.imgList = res.tempFilePaths
					};
				}
			});
		},
		viewImage:function (e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		delImg: function (e) {
			this.imgList.splice(e.currentTarget.dataset.index, 1);
		},
		upData: function () {
			if(this.type != '选择反馈类型'){
				console.log(this.imgList);
			}else{
				uni.showToast({
					title: "请选择反馈类型",
					duration: 2000,
					icon: "none"
				});
			};
		}
	}
}
</script>

<style scoped>
#FEEDBACK{
	background-color: #F4F4F4;
	height: 100vh;
	padding: 3% 4%;
}
.feedback_type_box{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #E3E3E3;
	background-color: white;
	color: #808080;
	padding: 10px 5px 10px 8px;
	font-size: 0.8em;
	margin-bottom: 10px;
}
.feedback_text_box{
	border: 1px solid #E3E3E3;
	background-color: white;
	padding: 5px 8px;
	margin-bottom: 10px;
	color: #808080;
	font-size: 0.8em;
}
.feedback_text{
	width: 100%;
}
.feedback_text_tip{
	text-align: right;
	padding-right: 10px;
	font-size: 13px;
}
.feedback_tel_box{
	border: 1px solid #E3E3E3;
	background-color: white;
	color: #808080;
	padding: 5px 8px;
	font-size: 0.8em;
	margin-bottom: 10px;
}
.feedback_img_box{
	margin-bottom: 10px;
	border: 1px solid #E3E3E3;
	background-color: white;
	padding: 8px 8px 0px;
}
.img_text_box{
	display: flex;
	font-size: 0.8em;
	color: #808080;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 5px;
}
.feedback_img{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.img_blank{
	border: 1px solid #E3E3E3;
	width: calc((100% - 26px)/4);
	height: 0px;
	padding-bottom: calc((100% - 26px)/4);
	margin-right: 8px;
	margin-bottom: 8px;
	align-items: center;
	justify-content: center;
	position: relative;
}
.img_box{
	width: calc((100% - 26px)/4);
	height: 0px;
	padding-bottom: calc((100% - 26px)/4);
	margin-right: 8px;
	margin-bottom: 8px;
	align-items: center;
	justify-content: center;
	position: relative;
}
.img_blank:last-of-type{
	margin-right: 0px;
}
.img_box:nth-of-type(4){
	margin-right: 0px;
}
.feed_img{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.img_blank .uni_Icon{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.close_box{
	background-color: rgba(0,0,0,0.4);
	width: 20px;
	height: 20px;
	position: absolute;
	z-index: 1024;
	right: 0;
}
.close_box .uni_close{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.button_color{
	height: 36px;
	line-height: 36px;
}
</style>
