<template>
	<div class="compute" ref='compute'>
		<div class="content">
			<div class="title" v-on:click='openCalendar()'>
				<p>从</p>
				<p>{{selectedData}}</p>
				<p>开始</p>
				<i class="icon icon-jiantou">&#xe647;</i>
			</div>
			<div class="daysbefore">
				<div class="input_area">
					<input type="text">
					<div class="btn">天之前</div>
				</div>
				<p class="date">公元 1945-3-13 星期三</p>
			</div>
			<div class="daysafter">
				<div class="input_area">
					<input type="text">
					<div class="btn">天之后</div>
				</div>
				<p class="date">公元 1945-3-13 星期三</p>
			</div>
			<div class="title">
				<p>距离</p>
				<p>{{selectedData}}</p>
				<p>还有</p>
				<i class="icon icon-jiantou">&#xe647;</i>
			</div>
			<div class="counts">
				<p>28607</p>
				<span>Days</span>
			</div>
		</div>
		<datepicker ref="datepicker"></datepicker>
		<picker ref='picker' v-on:returndate='getDate'></picker>
	</div>
</template>
<script>
	import Picker from '../components/picker'
	export default{
		data:function(){
			return {
				selectedData:'2013-2-12 星期六',
				isOpen:true,
	      		value:"",
	      		date:"2013-10-10"
			}
		},
		methods:{
			initSize:function(){
				var _this = this;
				//离顶部距离
				var offsetTop = _this.$refs.compute.offsetTop;
					//窗口的高度
				var height = window.screen.height;
				console.log(height)
				_this.$refs.compute.style.height=(height-offsetTop)+'px'
			},
			handleSelect(value){
		        this.value = value;
		    },
		    openPicker(){
		        this.$refs.datepicker.openPicker();
		    },
		    closePicker(){
		        this.isOpen = false;
		    },
		    openCalendar:function(){
				var datas = [];
				var year = [];
				for(let i=1900;i<2200;i++){
					var temp ={}
					temp.text = i+'年';
					temp.value = i;
					year.push(temp)
				}
				var month = [];
				for(let i=1;i<13;i++){
					var temp ={}
					temp.text = i+'月';
					temp.value = i;
					month.push(temp)
				}
				var date = [];
				for(let i=1;i<32;i++){
					var temp ={}
					temp.text = i+'日';
					temp.value = i;
					date.push(temp)
				}
				datas.push(year);
				datas.push(month);
				datas.push(date);
				this.$refs.picker.isShow("returndate",datas);
			},
		},
		getDate:function(val){
			alert(val);
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