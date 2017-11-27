<template>
	<transition name='slide'>
		<div class="sideBar" v-show='isShow'>
			<div class="part-top" @click="hide()">
				<p>返回</p><i class="icon icon-back">&#xe656;</i>
			</div>
			<div class="marginTop20"></div>
			<div class="menu_item select" @click="selectCate(0)">
				<i class="icon">&#xe61c;</i><p>全部</p>
				<i class="icon icon-check" v-show='check[0]'>&#xe685;</i>
			</div>
			<div class="menu_item" @click="selectCate(1)">
				<i class="icon">&#xe651;</i><p>生活</p>
				<i class="icon icon-check" v-show='check[1]'>&#xe685;</i>
			</div>
			<div class="menu_item" @click="selectCate(2)">
				<i class="icon">&#xe689;</i><p>工作</p>
				<i class="icon icon-check" v-show='check[2]'>&#xe685;</i>
			</div>
			<div class="menu_item" @click="selectCate(3)">
				<i class="icon">&#xe601;</i><p>纪念日</p>
				<i class="icon icon-check" v-show='check[3]'>&#xe685;</i>
			</div>
			<div class="marginTop20"></div>
			<div class="menu_item">
				<i class="icon">&#xe645;</i><p>管理分类</p>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		data:function(){
			return {
				isShow:false,
				check:[
					true,false,false,false
				],
			}
		},
		methods:{
			show:function(){
				this.isShow = true;
			},
			hide:function(){
				this.isShow = false;
			},
			selectCate:function(index){
				var items = document.getElementsByClassName('menu_item');
				var checks = [];
				for (var i = 0; i < items.length; i++) {
					items[i].className = "menu_item";
					checks[i] = false
					
				}
				checks[index] = true;
				items[index].className = "menu_item select";
				this.check  = checks;
				console.log(this.check);

			}
		}
	}
</script>
<style>
	.slide-enter{
		transform: translateX(-100%);
	}
	.slide-enter-to{
		transform: translateX(0);
	}
	.slide-leave{
		transform: translateX(0);
	}
	.slide-leave-to{
		transform: translateX(-100%);
	}
	.slide-enter-active,.slide-leave-active{
		transition: all 0.3s ease;
	}
	.sideBar{
		position: fixed;
		z-index: 100;
		width: 50%;
		height: 100%;
		background: #fff;
		box-shadow: 3px 10px 20px rgba(0,0,0,0.3);
	}
	@font-face {
	  font-family: 'iconfont';  /* project id 478040 */
	  src: url('//at.alicdn.com/t/font_478040_iqmfk1l227a2a9k9.eot');
	  src: url('//at.alicdn.com/t/font_478040_iqmfk1l227a2a9k9.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_478040_iqmfk1l227a2a9k9.woff') format('woff'),
	  url('//at.alicdn.com/t/font_478040_iqmfk1l227a2a9k9.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_478040_iqmfk1l227a2a9k9.svg#iconfont') format('svg');
	}
	.icon{
	    font-family: 'iconfont';
	    display: inline-block;
	    font-style: normal;
	}
	.icon-back{
		font-weight: bold;
		width: 30px;
		height: 50px;
		float: right;
		text-align: center;
		line-height: 50px;
	}

	.part-top{
		background: #1E90FF;
		height: 50px;
		color: #fff;
	}
	.part-top p{
		float: right;
		line-height: 50px;
		box-sizing: border-box;
		padding-right: 8px;
	}
	.menu_item{
		height: 50px;
		border-bottom: 1px solid #F2F2F2;
		transition: all 0.3s;
		display: flex;
	}
	.select{
		background: #FcFcFc;
		box-shadow: -1px 2px 10px rgba(0,0,0,0.1) inset;
	}
	.marginTop20{
		border-bottom: 1px solid #F2F2F2;
		height: 30px;
	}
	.menu_item .icon{
		color: #1E90FF;
		width: 30px;
		height: 49px;
		line-height: 49px;
		float: left;
		margin-left: 10px;
	}
	.menu_item .icon-check{
		float: right;
		margin-right: 10px;
	}
	.menu_item p{
		color: #1E90FF;
		float: left;
		line-height: 49px;
	}
</style>