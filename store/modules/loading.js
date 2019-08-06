const state = {
    show: false,
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
    show(state) {
        state.show = true
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