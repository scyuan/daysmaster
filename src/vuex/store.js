import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	currPage : '/',
	currTile :'倒数日 · 全部',
	showSideBarIcon : true,
	showAddIcon : true,

	repeat1:[],
	repeat2:[
		{text:'不重复',value:0},
		{text:'天重复',value:1},
		{text:'周重复',value:2},
		{text:'月重复',value:3},
		{text:'年重复',value:4}
	],

	assorts:[
		{
			text:'生活',
			icon:'&#xe651;'
		},
		{
			text:'工作',
			icon:'&#xe689;'
		},
		{
			text:'纪念日',
			icon:'&#xe601;'
		}
	],

	records:[]
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
	},
	refreshAssorts(state,newAssorts){
		state.assorts = newAssorts;
	},
	addNewRecord(state,record){
		state.records.push(record);
		var obj = JSON.stringify(state.records);
		window.localStorage.setItem('records',obj);
	},
	editRecord(state,obj){
		state.records[obj.index] = obj.record;
		window.localStorage.setItem('records',obj);
	},
	f5records(state){
		var obj=JSON.parse(window.localStorage.getItem("records"));
		//判断是否有记录
		if(obj!=null){
			state.records = obj;	
		}
	}

}
export default new Vuex.Store({

	state,mutations
});