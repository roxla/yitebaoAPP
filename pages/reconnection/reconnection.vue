<template>
	<view id="RECONNECTION">
		<view class="recomm-box">
			<view class="recomm-img-box">
				<image src="../../static/reconnection/timeout.png" mode=""></image>
			</view>
			<button type="primary" style="color: #02ABA4; border-color: #02ABA4;" plain="true" @click="reConnection()">重新加载</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			backpage:"",
			backtype:""
		}
	},
	onLoad: function(options){
		this.backpage = options.backpage;
		this.backtype = options.backtype;
	},
	methods: {
		reConnection: function () {
			if(this.backtype == 1){
				uni.reLaunch({url:this.backpage});
			}else{
				uni.switchTab({url:this.backpage});
			};
		}
	}
}
</script>

<style>
.recomm-box{
	width: 70%;
	position: absolute;
	left: 50%;
	top: 45%;
	transform: translate(-50%, -50%);
}
.recomm-img-box{
	width: 40%;
	height: 0px;
	padding-bottom: 40%;
	margin: 0px auto 10px;
	position: relative;
}
.recomm-img-box image{
	width: 100%;
	height: 100%;
	position: absolute;
}
.recomm-box button{
	width: 50%;
	margin: auto;
	height: 30px;
	line-height: 30px;
	font-size: 15px;
}
</style>
