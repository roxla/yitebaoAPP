const state = {
    show: false,
	title:"标题",
	list:["sheet1","sheet2"],
	cancelText:"取消",
	callback:()=>{}
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
    show(state,option) {
        state.show = true
		if(typeof option == 'object'){
			state=Object.assign(state,option)
		}
    },
    hide(state,index) {
        state.show = false
		let callback=state.callback
		if(index!==undefined){
			callback&&callback(index)
		}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}