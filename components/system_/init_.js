import Vue from 'vue'
let init_components = (v, store) => {
    // 模态框
    v.prototype.$showModal = (option) => {
        store.commit('modal/showmodal', option)
    }
    // loading
    v.prototype.$showLoading = () => {
        store.commit('loading/show')
    }
    v.prototype.$hideLoading = () => {
        store.commit('loading/hide')
    }
    // msg
    v.prototype.$alert = (option) => {
        store.commit('msg_tips/show', option)
        setTimeout(() => {
            store.commit('msg_tips/hide')
        }, option && option.time || 1000)
    }
    // 底部弹出菜单
    v.prototype.$showActionSheet = (option) => {
        store.commit('action_sheet/show', option)
    }
}
export default init_components