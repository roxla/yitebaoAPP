const state = {
    show: false,
    msg: "",
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
    show(state, option) {
        state.show = true
        if (typeof option == 'object') {
            state.msg = option.msg
        } else if (typeof option == 'string') {
            state.msg = option
        }
    },
    hide(state) {
        state.show = false
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}