<template>
	<transition name='slide'>
	<div class="assort" v-if='show'>
		<div class="header">
		    <i class="icon icon-list" @click='back()'>&#xe666;</i>
		    <p>分类</p>
		    <i class="icon icon-add" @click='edit()' v-show='showEdit'>&#xe8a1;</i>
		    <i class="icon icon-add" @click='save()' v-show='!showEdit'>完成</i>
		</div>
		<div class="content">
			<div class="form">
				<div class="input_group" v-bind:class="{'nobb':(index == list.length-1)}" v-for='(item,index) in list'>
					<!-- 如果是新添加的一行分类，初始显示一个删除icon -->
					<i class="icon" style="color:red;margin-right:5px;" v-on:click='deleteAssort(index)' v-if='item.isNew'>&#xe600;</i>
					<!-- 分类的icon -->
					<i class="icon icon-group" v-html='item.body.icon'></i>
					<!-- 通过isNew来判断是否是先添加的一行，如果是，则input可输入 -->
					<input type="text" v-model="item.body.text" disabled v-show='!item.isNew'>
					<input type="text" v-model="item.body.text" v-show='item.isNew'>
					<!-- 选择中框 -->
					<div class="select_div" v-show='!item.isNew' @click='selectAssort(index)'>
						<i class='icon' v-show='item.showGou'>&#xe685;</i>
					</div>
				</div>
			</div>
			<div class="btn" @click='addNew()'>添加新分类</div>
		</div>
	</div>
	</transition>
</template>
<script>
	export default{
		data:function(){
			return {
				show:false,
				list:null,
				showEdit:true
			}
		},
		methods:{
			save(){
				//将当前list保存到vuex中，并更新本实例的list,即isNew=false;
				var newList = [];
				var uploadList = [];
				for(let i=0;i<this.list.length;i++){
					uploadList.push(this.list[i].body);
					this.list[i].isNew = false;
					newList.push(this.list[i]);
				}
				this.$store.commit('refreshAssorts',uploadList);
				var divs = document.getElementsByClassName('select_div');
				for(let i = 0;i<divs.length;i++){
					divs[i].className='select_div'
				}
				this.showEdit = true;
			},
			deleteAssort(index){
				this.list.splice(index,1);
			},
			addNew(){

				if(this.list.length>8){
					return ;
				}

				this.showEdit = false;

				var divs = document.getElementsByClassName('select_div');
				if(divs[0].className != 'select_div select_div_hide'){
					for(let i = 0;i<divs.length;i++){
						divs[i].className='select_div select_div_hide'
					}
				}
				
				//新增一行
				var new_item = {};
				new_item.body = {
					text:'新分类',
					icon:'&#xe644;'
				}	
				new_item.showGou = false;
				new_item.isNew = true;
				this.list.push(new_item);
			},
			selectAssort(index){
				var list = this.list;
				for(let i = 0;i<list.length;i++){
					list[i].showGou = false;
				}
				list[index].showGou = true;
				this.list = list;
				//传参
				var _this = this;
				setTimeout(function(){
					_this.$emit('returnassort',list[index].body.text);
					_this.isHide();
				},200)
				
			},
			isShow(assort){
				this.show = true;
				console.log(assort)
				var list = this.$store.state.assorts;
				var tempList = [];
				for(let i=0;i<list.length;i++){
					var temp={}
					temp.body = list[i]
					if(list[i].text==assort){
						temp.showGou = true;
					}else{
						temp.showGou = false;
					}
					tempList.push(temp)
				}
				this.list = tempList;
			},
			isHide(){
				this.show = false;
			},
			back(){
				this.isHide();
			}
		}
	}
</script>
<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 478040 */
	  src: url('//at.alicdn.com/t/font_478040_8fgex1iuyl9885mi.eot');
	  src: url('//at.alicdn.com/t/font_478040_8fgex1iuyl9885mi.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_478040_8fgex1iuyl9885mi.woff') format('woff'),
	  url('//at.alicdn.com/t/font_478040_8fgex1iuyl9885mi.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_478040_8fgex1iuyl9885mi.svg#iconfont') format('svg');
	}
	.icon-group{
		color:#999;
	}
	.assort{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 110;
		background: #fff;
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
	.content{
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
	}
	.form{
		width: 100%;
		border:1px solid #ccc;
		border-radius: 10px;
		box-sizing: border-box;
		overflow: hidden;
	}
	.input_group{
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #ccc;
		line-height: 40px;
		padding-left: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		position: relative;
	}
	.nobb{
		border-bottom: 0;
	}
	.btn{
		height: 40px;
		margin-top: 15px;
		background: #1E90FF;
		color: #fff;
		text-align: center;
		line-height: 40px;
		border-radius: 10px;
	}
	.select_div{
		position: absolute;
		right: 0;
		height: 40px;
		width: 40px;
		border-left: 1px solid #ccc;
		text-align: center;
		line-height: 40px;
		transition: all 0.3s;
	}
	.select_div_hide{
		right: -41px;
	}
	.input_group input{
		outline: 0;
		height: 100%;
		margin-left: 5px;
		border:0;
		color:#666;
	}
	.input_group input[disabled]{
		opacity:1;
		background: #fff;
	}
</style>