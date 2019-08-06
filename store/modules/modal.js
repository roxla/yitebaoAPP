const state = {
    show: false,
    title: "hello",
    content: "这是一个对话框",
    confirmText: "确定",
    cancelText: "取消",
    callback: () => {}
}

// getters
const getters = {

}
const setters = {

}
// actions
const actions = {

}

// mutations
const mutations = {
    showmodal(state, option) {
        state.show = true
        if (typeof option == 'object') {
            state = Object.assign(state, option)
        }
    },
    hidemodal(state, data) {

        state.show = false
        let res = {
            confirm: data == 'confirm',
            cancel: data == 'cancel',
        }
        // console.log(state.callback)
        let callback = state.callback
        callback && callback(res)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}