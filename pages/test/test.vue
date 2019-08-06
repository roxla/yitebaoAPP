<template>
	<view>
		<view class="test_box">
			<view class="test" :style="{'width':loading+'%'}"></view>
		</view>
		<view class="">{{loading}}%</view>
		<view class="" @click="test">test</view>
		<!-- <input type="number" v-model="Test" />
		<button type="primary" @click="test">test</button> -->
		
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
	components: {
		uniIcon,
		uniPopup
	},
	data() {
		return {
			Test:"",
			loading:0,
			type:false
		}
	},
	methods: {
		test: function () {
			if(!this.setLoading){
				this.setLoading = setInterval(() => {
					if(this.loading != 100){
						this.loading = parseInt(this.loading) + 1;
					}else{
						clearInterval(this.setLoading);
					}
				},1000);
			};
		},
		// test: function () {
		// 	uni.requestPayment({
		// 		provider: 'alipay',
		// 		orderInfo: this.Test, //微信、支付宝订单数据
		// 		success: function (res) {
		// 			console.log('success:' + JSON.stringify(res));
		// 		},
		// 		fail: function (err) {
		// 			console.log('fail:' + JSON.stringify(err));
		// 		}
		// 	});
		// }
	}
}
</script>

<style>
.test_box{
	height: 14px;
	width: 90%;
	border: 1px solid black;
	border-radius: 2500px;
	margin: auto;
	overflow: hidden;
}
.test{
	background-color: #FFCCCC;
	height: 100%;
}
</style>
