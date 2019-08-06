<template>
	<view>
		<u-parse :content="article" @preview="preview" @navigate="navigate" ></u-parse>
	</view>
</template>

<script>
import uParse from '@/components/u-parse/u-parse.vue'
export default {
	components: {
		uParse
	},
	data() {
		return {
			article:"<p>123</p>"
		}
	},
	methods: {
		preview(src, e) {
			// do something
		},
		navigate(href, e) {
			// do something
		}
	}
}
</script>

<style>
@import url("../../components/u-parse/u-parse.css");
</style>
