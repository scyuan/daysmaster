<template>
	<div class="compute" ref='compute'>
		<div class="content">
			<div class="title" v-on:click='openSatrtCalendar()'>
				<p>从</p>
				<p id='start'>{{selectedData}}</p>
				<p>开始</p>
				<i class="icon icon-jiantou">&#xe647;</i>
			</div>
			<div class="daysbefore">
				<div class="input_area">
					<input v-model='beforeNumber' @change='computeBefore()' type="text">
					<div class="btn">天之前</div>
				</div>
				<p class="date" id='date1'>请输入数字开始计算</p>
			</div>
			<div class="daysafter">
				<div class="input_area">
					<input v-model='afterNumber' @change='computedAfter()' type="text">
					<div class="btn">天之后</div>
				</div>
				<p class="date" id='date2'>请输入数字开始计算</p>
			</div>
			<div class="title" v-on:click='openEndCalendar()'>
				<p>距离</p>
				<p>{{selectedData1}}</p>
				<p>还有</p>
				<i class="icon icon-jiantou">&#xe647;</i>
			</div>
			<div class="counts">
				<p>{{count}}</p>
				<span>Days</span>
			</div>
		</div>
		<picker ref='picker' v-on:returndatestart='getSatrtDate' v-on:returndateend='getEndDate'></picker>
	</div>
</template>
<script>
	import Picker from '../components/picker'
	import {dateUtil} from '../util/util'
	export default{
		data:function(){
			return {
				selectedData:'',
				selectedData1:'',
				isOpen:true,
	      		value:"",
	      		date:"2013-10-10",
	      		beforeNumber:"",
	      		afterNumber:"",
	      		beforeDate:'',
	      		count:0
			}
		},
		methods:{
			computeBefore:function(){
				var beforeNumber =  parseInt(this.beforeNumber);
				//将beforeNumver转为毫秒
				beforeNumber = beforeNumber * 24 * 60 * 60 * 1000;
				var select = this.selectedData.split(' ')[0];
				var select_number = new Date(select).getTime();

				var newTime = new Date(select_number-beforeNumber);
				document.getElementById('date1').innerHTML ='公历 '+ newTime.getFullYear() + '-' + (newTime.getMonth()+1)+'-'+newTime.getDate();
				var week = dateUtil.getWeek(newTime);
				document.getElementById('date1').innerHTML = document.getElementById('date1').innerHTML + ' ' + week;
			},
			computedAfter:function(){
				var afterNumber = parseInt(this.afterNumber);

				afterNumber = afterNumber *24*60*60*1000;
				var select = this.selectedData1.split(' ')[0];
				var select_number = new Date(select).getTime();

				var newTime = new Date(select_number+afterNumber);
				document.getElementById('date2').innerHTML ='公历 '+ newTime.getFullYear() + '-' + (newTime.getMonth()+1)+'-'+newTime.getDate();
				var week = dateUtil.getWeek(newTime);
				document.getElementById('date2').innerHTML = document.getElementById('date2').innerHTML + ' ' + week;
			},
			initSize:function(){
				var _this = this;
				//离顶部距离
				var offsetTop = _this.$refs.compute.offsetTop;
					//窗口的高度
				var height = window.screen.height;
				console.log(height)
				_this.$refs.compute.style.height=(height-offsetTop)+'px'
			},
		    closePicker(){
		        this.isOpen = false;
		    },
		    openSatrtCalendar:function(){
				var datas = dateUtil.initCalendarPickerDatas();
				this.$refs.picker.isShow("returndatestart",datas);
			},
			openEndCalendar:function(){
				var datas = dateUtil.initCalendarPickerDatas();
				this.$refs.picker.isShow("returndateend",datas);
			},
			getSatrtDate:function(obj){
				var date = obj.a+'-'+obj.b+'-'+obj.c;
				var d = new Date(obj.a,obj.b-1,obj.c);
				var week = dateUtil.getWeek(d)
				this.selectedData = date+' '+week;
				this.count = dateUtil.getDiff(this.selectedData.split(' ')[0],this.selectedData1.split(' ')[0],false);
			},
			getEndDate:function(obj){
				var date = obj.a+'-'+obj.b+'-'+obj.c;
				var d = new Date(obj.a,obj.b-1,obj.c);
				var week = dateUtil.getWeek(d)
				this.selectedData1 = date+' '+week;
				this.count = dateUtil.getDiff(this.selectedData.split(' ')[0],this.selectedData1.split(' ')[0],false);
			},
		},
		created:function(){
			//初始化一些数据
			var date = new Date();
			var now = date.getFullYear() + '-' + (date.getMonth()+1)+'-'+date.getDate();
			console.log('date:'+date);
			var week = dateUtil.getWeek(date);
			var now = now + ' ' + week;
			this.selectedData = now;
			this.selectedData1 = now;
		},
		mounted:function(){
			var _this = this;
			_this.initSize();
			window.onresize=function(){
				_this.initSize();
			}
		},
		components:{
			Picker
		}
	}
</script>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 478040 */
  src: url('//at.alicdn.com/t/font_478040_c8c3zdkq7zknjyvi.eot');
  src: url('//at.alicdn.com/t/font_478040_c8c3zdkq7zknjyvi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_478040_c8c3zdkq7zknjyvi.woff') format('woff'),
  url('//at.alicdn.com/t/font_478040_c8c3zdkq7zknjyvi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_478040_c8c3zdkq7zknjyvi.svg#iconfont') format('svg');
}
.icon{
    font-family: 'iconfont';
    display: inline-block;
    font-style: normal;
    color: #aaa;
  }
	.compute{
		background: #F5F5F5;
		padding: 15px;
		box-sizing: border-box;
	}
	.content{
		height: 100%;
		background: #fff;
		border-radius: 15px;
	}
	.content .title{
		height: 10%;
		width: 100%;
		border-bottom: 1px solid rgba(204, 204, 204, 0.24);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title p:nth-child(1){
		font-weight: bold;
		color:#aaa;
		margin-right: 20px;
	}
	.title p:nth-child(2){
		font-weight: 600;
		color: #004891;
	}
	.title p:nth-child(3){
		font-weight: bold;
		color:#aaa;
		margin-left: 20px;
	}
	.daysbefore,.daysafter{
		height: 30%;
		border-bottom: 1px solid rgba(204, 204, 204, 0.24);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.input_area{
		width: 80%;
		height: 40px;
		border-radius: 20px;
		border:1px solid #ccc;
		overflow:hidden;
	}
	.input_area input{
		height: 100%;
		width: 70%;
		border:0;
		text-align: right;
		outline: 0;
		font-size: 30px;
		float: left;
	}
	.input_area .btn{
		width: 30%;
		height: 100%;
		background: #eee;
		float: left;
		box-sizing: border-box;
		border-left: 1px solid #ccc;
		text-align: center;
		line-height: 42px;
		font-weight: bold;
		color: #aaa;
	}
	.date{
		font-weight: bold;
		margin-top: 10px;
		color: #555;
	}
	.counts{
		height: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.counts p {
		font-size: 30px;
		font-weight: bold;
		color: #004891;
	}
	.counts span{
		padding: 2px 5px;
		background: #ccc;
		margin-left: 10px;
		border-radius: 6px;
		color: #fff;
		font-weight: bold;
	}
</style>