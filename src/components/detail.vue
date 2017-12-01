<template>
	<transition name="slide">
		<div class="detail" v-if='show'>
			<p class="desc">{{item.desc}}</p>
			<p class="days">{{item.days}}<span>天</span></p>
			<p class="time" id='time'>{{time}}</p>
			<p class="edit" @click='edit()'>编辑<i class="icon icon-edit">&#xe604;</i></p>
			<p class="back" @click='back()'><i class="icon icon-backk">&#xe604;</i>返回</p>
		</div>
	</transition>
</template>
<script>
import {dateUtil} from '../util/util'
	export default{
		data(){
			return {
				show:false,
				item:{},
				index:null,
				time:''
			}
		},
		methods:{
			isShow(item,index){
				this.show = true;
				this.item = item;
				this.index = index;
				var week = dateUtil.getWeek(new Date(item.time));
				this.time = item.time+' ' + week;
			},
			isHide(){
				this.show = false;
			},
			back(){ 
				this.isHide();
			},
			edit(){
				this.$emit('openedit',{item:this.item,index:this.index});
			}
		},
		components:{
			
		},
		beforeCreate () {
		   console.group('%c%s', 'color:red', 'beforeCreate 创建前状态===============组件detail》')
		 },
		 created () {
		   console.group('%c%s', 'color:red', 'created 创建完毕状态===============组件detail》')

		 },
		 beforeMount () {
		   console.group('%c%s', 'color:red', 'beforeMount 挂载前状态===============组件detail》')
		 },
		 mounted () {
		   console.group('%c%s', 'color:red', 'mounted 挂载状态===============组件detail》')
		   console.log(document.getElementsByClassName('detail')[0])
		   console.log(this.$el)
		 },
		 beforeUpdate () {
		   console.group('%c%s', 'color:red', 'beforeUpdate 更新前状态===============组件detail》')
		 },
		 updated () {
		   console.group('%c%s', 'color:red', 'updated 更新状态===============组件detail》')
		 },
		 beforeDestroy () {
		   console.group('%c%s', 'color:red', 'beforeDestroy 破前状态===============组件detail》')
		 },
		 destroyed () {
		   console.group('%c%s', 'color:red', 'destroyed 破坏状态===============组件detail》')
		 }
	}
</script>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 478040 */
  src: url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.eot');
  src: url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.woff') format('woff'),
  url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.svg#iconfont') format('svg');
}
	.slide-enter,.slide-leave-to{
		opacity: 0;
		transform: scale(0.5);
	}
	.slide-enter-to,.slide-leave{
		opacity: 1;
		transform: scale(1);
	} 
	.slide-enter-active,.slide-leave-active{
		transition: all 0.3s ease;
	}
	.detail{
		position: fixed;
		background: linear-gradient(to bottom,#208FFF,#75BAFF);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 100;
		opacity: 0.95;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		color:#fff;
	}
	.desc{
		font-size: 30px;
		margin-top: 10%;
		color: #fff;
		position: relative;
	}
	.desc:before{
		content: "_____";
		position: absolute;
		left: -85px;
		top: -10px;
	}
	.desc:after{
		content: "_____";
		position: absolute;
		right: -85px;
		top: -10px;
	}
	.days{
		font-size: 110px;
		font-weight: bold;
		margin: 25% 0;
	}
	.days span{
		font-size: 20px;
	}
	.time{
		font-size: 18px;
		color: #eee;
		position: relative;
	}
	.time:before{
		content: "______";
		position: absolute;
		left: -70px;
		top: -5px;
	}
	.time:after{
		content: "______";
		position: absolute;
		right: -70px;
		top: -5px;
	}
	.edit,.back{
		position: fixed;
		bottom: 20px;
	}
	.edit{
		bottom: 60px;
	}
	.icon-edit{
		margin-left: 10px;
		transform:rotate(180deg);
		animation: right 1s infinite;
	}
	@keyframes right{
		0%{	
			transform: translateX(0) rotate(180deg);
		}50%{
			
			transform: translateX(6px) rotate(180deg);
		}
		100%{
			transform: translateX(0) rotate(180deg);
		}
	}
	.icon-backk{
		margin-right: 10px;
		animation: left 1s infinite;
	}
	@keyframes left{
		0%{	
			transform: translateX(0);
		}50%{
			
			transform: translateX(-6px);
		}
		100%{
			transform: translateX(0);
		}
	}
</style>