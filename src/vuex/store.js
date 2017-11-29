import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	currPage : '/',
	currTile :'倒数日 · 全部',
	showSideBarIcon : true,
	showAddIcon : true,

	repeat1:[],
	repeat2:[{text:'不重复',value:0},{text:'天重复',value:1},{text:'周重复',value:2},{text:'月重复',value:3},{text:'年重复',value:4}]
}
const mutations = {
	changeCurrPage(state,path){
		state.currPage = path;
	},
	toggleIcons(state,showhide){
		state.showSideBarIcon = showhide;
		state.showAddIcon = showhide;
	},
	changeTitle(state,newtitle){
		state.currTile = newtitle;
	},
	saveRepeat(state,newrepeat){
		state.repeat1 = newrepeat;
	}
}
export default new Vuex.Store({
	state,mutations
});