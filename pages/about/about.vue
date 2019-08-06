<template>
	<view id="ABOUT" :style="'height:'+height+'px'">
		<view class="about_img_box">
			<image src="../../static/logo/u10410.png" class="about_img"></image>
		</view>
		<view class="about_item_box">
			<dl class="about_item">
				<dd class="about_item_left">版本</dd>
				<dd class="about_item_right">v{{ver}}</dd>
			</dl>
			<dl class="about_item">
				<dd class="about_item_left">客服热线</dd>
				<dd class="about_item_right">400-8820-8820</dd>
			</dl>
			<dl class="about_item" @click="goRouter()">
				<dd class="about_item_left">用户协议</dd>
				<dd class="about_item_right">
					<uni-icon class="uni_Icon" type="arrowright" color="#999" size="20" ></uni-icon>
				</dd>
			</dl>
		</view>
		<view class="about_copyright">
			<view class="about_copyright_item">天津衣特宝洗衣&copy 版权所有</view>
		</view>
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
			height:0,
			ver:""
		}
	},
	onNavigationBarButtonTap: function () {
		uni.reLaunch({
			url: "../setting/setting"
		});
	},
	onLoad: function () {
		this.height = uni.getSystemInfoSync().windowHeight;
		// #ifdef APP-PLUS
		this.ver = plus.runtime.version;
		// #endif
	},
	methods: {
		goRouter: function () {
			uni.navigateTo({
				url: '../rule/rule'
			});
		}
	}
}
</script>

<style>
#ABOUT{
	background-color: #F4F4F4;
}
.about_img_box{
	width: 45%;
	height: 0;
	padding-bottom: 45%;
	position: relative;
	margin: 0px auto 10px;
}
.about_img{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.about_item_box{
	margin: auto;
	width: 90%;
	background-color: white;
	border: 1px solid #E3E3E3;
}
.about_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 3%;
	border-bottom: 1px solid #E3E3E3;
	font-size: 0.8em;
}
.about_item:last-of-type{
	border-bottom: 0px;
}
.about_item_right{
	text-align: right;
	color: #7F7F7F;
}
.about_copyright{
	width: 100%;
	font-size: 0.8em;
	text-align: center;
	color: #7F7F7F;
	padding-bottom: 5%;
	position: absolute;
	bottom: 0;
}
.about_copyright_item{
	width: 60%;
	margin: auto;
}
</style>
