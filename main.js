import Vue from 'vue'
import App from './App'
// 常见对popup组件 对话框 loading等
import store from './store';
import system_ from '@/components/system_/index';
import init_components from '@/components/system_/init_.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
init_components(Vue,store)

// 常见对popup组件 对话框 loading等
Vue.component('system', system_);

App.mpType = 'app'

Vue.prototype.apiServer = 'http://192.168.1.105:6679/'
Vue.prototype.checkLogin = function(backpage, backtype){
	let opid = uni.getStorageSync("openid");
	if(!opid){
		uni.reLaunch({
			url:"../login/login?backpage="+backpage+"&backtype="+backtype
		});
	}else{
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
				if(res.data.status === 911){
					uni.removeStorageSync("openid");
					uni.removeStorageSync("userName");
					uni.removeStorageSync("userTel");
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon: "none"
					});
					uni.reLaunch({
						url:"../login/login?backpage="+backpage+"&backtype="+backtype
					});
				}
			}
		})
	}
	return opid;
}
Vue.prototype.reconnect = function(backpage, backtype){
	uni.reLaunch({
		url:"../reconnection/reconnection?backpage="+backpage+"&backtype="+backtype
	});
}

const app = new Vue({
	store,
    ...App
})
app.$mount()
