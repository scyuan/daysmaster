<template>
	<transition name='slide'>
		<div class="edit" id='edit' ref='edit' v-if='isOpen'>
			<div class="header">
		      <i class="icon icon-list" @click='back()'>&#xe666;</i>
		      <p>编辑</p>
		      <i class="icon icon-add" @click='save()'>确认</i>
		    </div>
		    <div class="content" ref='cpm'>
		    	<div class="form">
		    		<div class="input_group">
		    			<i class="icon icon-form">&#xe669;</i>
		    			<input type="text" v-model='desc' placeholder="点击这里输入事件名称">
		    		</div>  
		    		<div class="input_group" @click='openCalendar()'>
		    			<i class="icon icon-form">&#xe635;</i>
		    			<div class="box">
		    				<p class="time" id='time'>{{full_time}}</p>
		    			</div>
		    		</div>
		    		<div class="input_group" @click='openAssort()'>
		    			<i class="icon icon-form">&#xe603;</i>
		    			<div class="box">
		    				<p class="a">分类</p>
		    				<i class="icon icon-form icon-right">&#xe642;</i>
		    				<p class="b" id='assort'>{{assort}}</p>
		    			</div>
		    		</div>
		    		<div class="input_group">
		    			<i class="icon icon-form">&#xe612;</i>
		    			<div class="box">
		    				<p style="float:left;color:#666">置顶</p>
		    				<div class="btn-wrap" v-on:click='zhiding()'>
		    					<div class="btn" v-if='zhidingv'></div>
		    					<div class="bg" v-if='zhidingv'></div>
		    					<div class="btn btnon" v-if='!zhidingv'></div>
		    					<div class="bg bgon" v-if='!zhidingv'></div>
		    				</div>
		    			</div>
		    		</div>
		    		<div class="input_group" id="repeat" v-on:click='select("repeat")'>
		    			<i class="icon icon-form">&#xe629;</i>
		    			<div class="box">
		    				<p class="a">重复</p>
		    				<i class="icon icon-form icon-right">&#xe642;</i>
		    				<p class="b" id='recicle'>{{repeat}}</p>
		    			</div>
		    		</div>
		    		<div class="input_group" v-on:click='openReminde()' style="border-bottom:0">
		    			<i class="icon icon-form">&#xe7eb;</i>
		    			<div class="box">
		    				<p class="a">提醒</p>
		    				<i class="icon icon-form icon-right">&#xe642;</i>
		    				<p class="b" id='reminde'>{{remind}}</p>
		    			</div>
		    		</div>      
		    	</div>
		    	<div class="submit" @click='save()'>确认修改</div>	
		    </div>
			<picker ref='picker' v-on:returndata='getData' v-on:returndate='getDate'></picker>
			<assort ref='assort' v-on:returnassort='getAssort'></assort>
			<reminde ref='reminde' v-on:returnremind='getRemind'></reminde>
		</div>
	</transition>
</template>
<script>
import Picker from './picker'
import Assort from './assort'
import Reminde from './reminde'
import {dateUtil} from '../util/util'
	export default{
		data:function(){
			return {
				isOpen:false,
				name:'',
				desc :"",
				full_time : "",
				assort : "",
				repeat : "",
				remind : '',
				storage:window.localStorage
			}
		},
		methods:{
			save:function(){
				//事件名称
				if(this.desc==''){
					return ;
				}

				//获取日期
				var time = this.full_time.split(' ')[0];
				var date = new Date();
				var now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
				if(this.$moment(time).isBefore(now)){
					this.desc = this.desc + '已经过去'
				}else{
					this.desc = this.desc + '还有'
				}
				//获取分类
				//var assort = document.getElementById('assort').innerHTML;  this.assort
				//获取置顶
				var oBtn = document.getElementsByClassName('btn')[0];
				
				if(oBtn.className == 'btn btnon'){
					this.zhiding = false;
				}else{
					this.zhiding = true;
				}
				//获取重复
				//var repeat = document.getElementById('recicle').innerHTML; this.repeat
				//获取remind
				//var remind = document.getElementById('reminde').innerHTML; this.remind
				var record = {
					full_time:this.full_time,
					desc:this.desc,
					time:time,
					assort:this.assort,
					zhiding:this.zhiding,
					repeat:this.repeat,
					remind:this.remind
				};
				this.$store.commit('editRecord',{record:record,index:this.index});
				this.$emit('refresh');
				this.isOpen = false;
			},
			getRemind:function(newRemind){
				this.remind = newRemind;
			},
			openReminde:function(){
				this.$refs.reminde.isShow(document.getElementById('reminde').innerHTML);
			},
			getAssort:function(newAssore){
				this.assort = newAssore;
			},
			openAssort:function(){
				var assort = document.getElementById('assort').innerHTML;
				this.$refs.assort.isShow(assort);
			},
			zhiding:function(){
				var btn = document.getElementsByClassName('btn')[0];
				var bg = document.getElementsByClassName('bg')[0];
				if(btn.className=='btn'){
					btn.className = 'btn btnon';
					bg.className ='bg bgon'
					this.zhidingv = false;
				}else{
					btn.className = 'btn';
					bg.className ='bg'
					this.zhidingv = true;
				}
			},
			getData:function(obj){
				if(obj.a==0||obj.b==0){
					this.repeat = '不重复'
				}else{
					this.repeat = this.$store.state.repeat1[obj.a].text + this.$store.state.repeat2[obj.b].text
				}
			},
			getDate:function(obj){
				var oTime = document.getElementsByClassName('time')[0];
				var date = obj.a+'-'+obj.b+'-'+obj.c;
				var d = new Date(obj.a,obj.b-1,obj.c);
				var week = dateUtil.getWeek(d);
				this.full_time = date+' '+week;
			},
			show:function(obj){
				this.isOpen = true;
				var item = obj.item;
				this.index = obj.index;
				this.item = item;
				this.desc = item.desc;
				this.full_time = item.time + ' ' + dateUtil.getWeek(new Date(item.time));
				this.assort = item.assort;
				this.repeat = item.repeat;
				this.remind = item.remind;
				this.zhidingv = item.zhiding
			},
			hide:function(){
				this.isOpen = false;
			},
			back:function(){
				this.isOpen = false;
			},
			openCalendar:function(){
				var datas = dateUtil.initCalendarPickerDatas();
				this.$refs.picker.isShow("returndate",datas);
			},
			select:function(id){
				var datas = [];
				var data1 = this.$store.state.repeat1;
				if(data1.length==0){
					for(let i = 0; i<1000;i++){
						var temp = {}
						if (i==0) {
							temp.text = '不重复'
							temp.value = 0
							data1.push(temp)
							continue;
						}
						if (i==1) {
							temp.text = '每'
							temp.value = 1
							data1.push(temp)
							continue;
						}
						temp.text = '每'+i
						temp.value = i
						data1.push(temp);
					}
					//将数据存入store
					this.$store.commit('saveRepeat',data1);
				}
				var data2 = this.$store.state.repeat2;
				datas.push(data1);
				datas.push(data2);
				this.$refs.picker.isShow("returndata",datas);
			}
		},
		components:{
			Picker,Assort,Reminde 
		},
		beforeCreate () {
		   console.group('%c%s', 'color:blue', 'beforeCreate 创建前状态===============组件edit》')
		 },
		 created () {
		   console.group('%c%s', 'color:blue', 'created 创建完毕状态===============组件edit》')

		 },
		 beforeMount () {
		   console.group('%c%s', 'color:blue', 'beforeMount 挂载前状态===============组件edit》')
		 },
		 mounted () {
		   console.group('%c%s', 'color:blue', 'mounted 挂载状态===============组件edit》')
		   /* this.$nextTick(function(){
		        //对DOM的操作放这
		        console.log(document.getElementById('edit'));
		    })*/
		    console.log(this.$refs);
		    console.log(this.$el)
		 },
		 beforeUpdate () {
		   console.group('%c%s', 'color:blue', 'beforeUpdate 更新前状态===============组件edit》')
		   console.log(this.$refs.edit);
		 },
		 updated () {
		   console.group('%c%s', 'color:blue', 'updated 更新状态===============组件edit》')
		    /*console.log(this.$refs.edit);
		    var btn = document.getElementsByClassName('btn')[0];
				var bg = document.getElementsByClassName('bg')[0];
				if(this.zhidingv){
					btn.className = 'btn';
					bg.className ='bg'
				}else{
					btn.className = 'btn btnon';
					bg.className ='bg bgon'
				}*/
		 },
		 beforeDestroy () {
		   console.group('%c%s', 'color:blue', 'beforeDestroy 破前状态===============组件edit》')
		 },
		 destroyed () {
		   console.group('%c%s', 'color:blue', 'destroyed 破坏状态===============组件edit》')
		 }
	}
</script>
<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 478040 */
	  src: url('//at.alicdn.com/t/font_478040_xom0epzqt05rvn29.eot');
	  src: url('//at.alicdn.com/t/font_478040_xom0epzqt05rvn29.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_478040_xom0epzqt05rvn29.woff') format('woff'),
	  url('//at.alicdn.com/t/font_478040_xom0epzqt05rvn29.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_478040_xom0epzqt05rvn29.svg#iconfont') format('svg');
	}
	.slide-enter,.slide-leave-to{
		transform: translateX(100%);
	}
	.slide-enter-to,.slide-leave{
		transform: translateX(0);
	}
	.slide-enter-active,.slide-leave-active{
		transition: all 0.3s ease;
	}
	.edit{
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #fff;
	}
	.content{
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
	}
	.form{
		width: 100%;
		border-radius: 5px;
		border: 1px solid #aaa;
		box-sizing: border-box;
		overflow: hidden;
	}
	.input_group{
		height: 35px;
		width: 100%;
		display: flex;
		border-bottom: 1px solid #aaa;
		box-sizing: border-box;
	}
	.icon-name{
		color: #ddd;
	}
	.icon-form{
		flex: 1;
		text-align: center;
		line-height: 35px;
		color: #888;
		font-weight: bold;
		font-size: 18px;

	}
	.input_group input{
		border: 0;
		outline: 0;
		flex: 8;
		font-size: 18px;
	}
	.input_group .box{
		flex: 8;
		padding-right: 10px;
		box-sizing: border-box;
		line-height: 35px;
		font-size: 15px;
		font-weight: bold;
	}
	.box .a{
		float: left;
		color:#666;
	}
	.box .b{
		float: right;
		color: #004891;
	}
	.time{
		color: #004891;
	}
	.box i{
		float: right;
	}
	.icon-right{
		font-size: 15px;
		margin-left: 5px;
	}
	input::placeholder{
		color: #aaa;
		font-size: 15px;
	}
	.submit{
		height: 40px;
		background: #1E90FF;
		margin-top: 20px;
		border-radius: 10px;
		color: #fff;
		font-size: 18px;
		text-align: center;
		line-height: 40px;
	}
	.btn-wrap{
		float:right;
		height: 24px;
		width: 45px;
		border:1px solid #ccc;
		border-radius: 12px;
		margin-top: 5px;
		box-sizing: border-box;
		position: relative;
		background: #31DB38;
		overflow: hidden;
	}
	.btn-wrap .btn{
		width: 24px;
		height: 24px;
		border-radius: 12px;
		background: #fff;
		box-sizing: border-box;
		border:1px solid #ccc;
		right: -1px;
		top: -1px;
		position: absolute;
		transition: all 0.3s;
		z-index: 10;
	}
	.btn-wrap .btnon{
		right: 21px;
	}
	.btn-wrap .bg{
		width: 100%;
		height: 100%;
		background: #fff;
		border-radius: 11px;
		transform: scale(0);
		transition:all 0.3s;
	}
	.btn-wrap .bgon{
		transform: scale(1);
	}
</style>