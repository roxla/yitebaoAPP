<template>
	<view>
		<view class="loading plane row" :class="show && 'active'">
			<view class="plane-close"></view>
			<view class="plane-content flex-row">
				<view class="loading-box flex-col">
					<image src="/static/fidget-spinner.gif" mode=""></image>
					<text>正在加载中...</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('loading',['show'])
		}
	}
</script>

<style>
	.loading{
		justify-content: center;
		align-items: center;
	}
	.loading .plane-content{
		justify-content: center;
		align-items: center;
		border-radius: 0;
		font-size: 28upx;
		color: #666;
		height: 100vh;
	}
	.loading .plane-content image{
		width: 60upx;
		height: 60upx;
		margin-bottom: 40upx;
		
	}
	.loading .loading-box{
		margin-bottom: 200upx;
		justify-content: center;
		align-items: center;
	}
</style>
