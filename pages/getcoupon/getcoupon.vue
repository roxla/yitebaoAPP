<template>
	<view id="GETCOUPON">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#F4A62F"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0" class="select_item" :style="'height:'+height+'px'">
				<scroll-view scroll-y style="height: 100%;">
					<view class="coupon_box">
						<view class="coupon_img">
							<image src="../../static/coupon/u2274.png"></image>
						</view>
						<view class="coupon_text_box">
							<view class="coupon_text">
								<view class="coupon_text_title">
									<view class="title_money">￥
										<text class="title_num">30</text>
										<view class="title_condition">满100可用</view>
									</view>
								</view>
								<view class="coupon_text_description">
									<view>洗衣七折券，最高折扣30元。</view>
									<view>此券不可拆分，仅限一次使用。</view>
								</view>
								<view class="coupon_text_schedule">
									<view class="schedule_item_left" v-if="loading!=100">已抢{{loading}}%</view>
									<view class="schedule_item_left" v-if="loading==100">已抢完</view>
									<view class="schedule_item_right">
										<view class="schedule_item" :style="{'width':loading+'%'}"></view>
									</view>
								</view>
							</view>
						</view>
						<view class="coupon_button unused" v-if="got" :style="'height:'+height*0.18+'px'">
							<view class="coupon_button_text" >立即领取</view>
							<view class="coupon_button_item"></view>
						</view>
						<view class="coupon_button used" v-if="!got" :style="'height:'+height*0.18+'px'">
							<view class="coupon_button_text">进场看看</view>
							<view class="coupon_button_item"></view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current === 1" class="select_item" :style="'height:'+height+'px'">
				<scroll-view scroll-y style="height: 100%;">
					<view class="coupon_box">
						<view class="coupon_img">
							<image src="../../static/coupon/u2274.png"></image>
						</view>
						<view class="coupon_text_box">
							<view class="coupon_text">
								<view class="coupon_text_title">
									<view class="title_money">￥
										<text class="title_num">30</text>
										<view class="title_condition">满100可用</view>
									</view>
								</view>
								<view class="coupon_text_description">
									<view>洗衣七折券，最高折扣30元。</view>
									<view>此券不可拆分，仅限一次使用。</view>
								</view>
								<view class="coupon_text_schedule">
									<view class="schedule_item_left" v-if="loading!=100">已抢{{loading}}%</view>
									<view class="schedule_item_left" v-if="loading==100">已抢完</view>
									<view class="schedule_item_right">
										<view class="schedule_item" :style="{'width':loading+'%'}"></view>
									</view>
								</view>
							</view>
						</view>
						<view class="coupon_button unused" v-if="got" :style="'height:'+height*0.18+'px'">
							<view class="coupon_button_text" >立即领取</view>
							<view class="coupon_button_item"></view>
						</view>
						<view class="coupon_button used" v-if="!got" :style="'height:'+height*0.18+'px'">
							<view class="coupon_button_text">进场看看</view>
							<view class="coupon_button_item"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
export default {
	components: {
		uniSegmentedControl
	},
	data() {
		return {
			height: 0,
			items: ['洗衣优惠券','商城优惠券'],
			current: 0,
			loading: 55,
			got: true
		}
	},
	onLoad: function () {
		this.height = uni.getSystemInfoSync().windowHeight - 10;
	},
	methods: {
		onClickItem(index) {
            if (this.current !== index) {
                this.current = index;
            }
        }
	}
}
</script>

<style scoped>
.select_item{
	background-color: #F4F4F4;
}
.coupon_box{
	width: 92%;
	margin: 10px auto 0px;
	display: flex;
	background-color: white;
	border: 1px solid #CCCCCC;
	align-items: center;
}
.coupon_box:last-of-type{
	margin-bottom: 10px;
}
.coupon_img{
	width: 30%;
	height: 0;
	padding-bottom: 28%;
	position: relative;
}
.coupon_img image{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
}
.coupon_text_box{
	width: calc(100% - 30%);
	padding-left: 5px;
}
.coupon_text_title{
	display: flex;
	color: #FE0302;
}
.title_num{
	font-size: 1.3em;
}
.title_condition{
	font-size: 0.7em;
	margin-left: 6px;
	display: inline-block;
	background-color: #FEEFF2;
}
.coupon_text_description{
	font-size: 0.7em;
	color: #666666;
	font-weight: bold;
}
.coupon_text_schedule{
	display: flex;
	align-items: center;
	margin-bottom: 2px;
}
.schedule_item_left{
	font-size: 0.6em;
	color: #666666;
	margin-right: 5px;
}
.schedule_item_right{
	height: 10px;
	width: 60%;
	border: 1px solid #666666;
	border-radius: 2500px;
	overflow: hidden;
}
.schedule_item{
	background-color: #FFCCCC;
	height: 100%;
}
.coupon_button{
	width: 25px;
	height: 100%;
	display: flex;
	font-weight: bold;
	font-size: 0.8em;
}
.coupon_button_text{
	text-align: center;
	vertical-align: middle;
	margin: auto;
}
.coupon_button_item{
	width: 0px;
	height: 100%;
	vertical-align: middle;
}
.unused{
	background-color: #FE0302;
	color: white;
}
.used{
	background-color: #CBCBCB;
	color: white;
}
</style>
