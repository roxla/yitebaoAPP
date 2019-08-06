<script>
import commentList from 'componentList.js'
import store from "./store";
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定
			uni.getSystemInfo({
				success: function(res) {
					console.log(res);
				}
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			let opid = uni.getStorageSync("openid");
			if (!!opid) {
				uni.request({
					url: this.apiServer + 'userServer/cunUserServer/getCunUserData',
					method: 'POST',
					data: {
						OpenId: uni.getStorageSync("openid")
					},
					header: {
						'content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if (res.data.status === 911) {
							uni.removeStorageSync("openid");
						}
					}
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		watch: {
			$route: function(to, form) {
				// console.log(to);
				if ("isQuit" in to.meta && to.meta.isQuit) {
					// console.log("返回上一页");
					// 检查是否有正在显示的组件
					let check = () => {
						return new Promise(resolve => {
							for (let i = 0; i < commentList.length; i++) {
								const element = commentList[i];
								// console.log(store.state[element].show);
								if (store.state[element].show) {
									resolve();
								}
							}
						});
					};
					// 添加路由记录
					check().then(() => {
						this.$router.history.push(form.path);
					});

				}
				// 隐藏全部组件
				this.$store.commit("hideall");
			}
		}
	}
</script>

<style>
@import url("/public.css");
* {
	min-height: 0px !important;
}
</style>
