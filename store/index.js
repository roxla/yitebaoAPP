import Vue from 'vue'
import Vuex from 'vuex'
// import sync from '../npmPackege/node_modules/uni-vuex-sync'
import modal from './modules/modal.js'
import loading from './modules/loading.js'
import msg_tips from './modules/msg_tips.js'
import action_sheet from './modules/action_sheet'


import commentList from '@/componentList.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        modal,
        loading,
        msg_tips,
        action_sheet
    },
    // 启用严格模式
    strict: true,

    plugins: [],
    mutations: {
		hideall(state) {
            for (let i = 0; i < commentList.length; i++) {
                const element = commentList[i];
                state[element].show = false
            }
        }
	}
})

export default store