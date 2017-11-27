<template>
	<div class="home" ref="home">
		<div class="content" ref='content'>
			<div class="top">
				<div class="wenzi">
					<p>iPhone已经发布</p>
					<p>起始日：2008-10-10 星期三</p>
				</div>
				<div class="days">
					<p>3801<span>days</span></p>
				</div>
			</div>
			<div class="list" ref="wrap">
				<div class="items">
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<div class="item">
						<div class="desc">iPhone已经发布</div>
						<div class="num">3801</div>
						<div class="tian">天</div>
					</div>
					<!-- <div class="item">09</div>
					<div class="item">10</div>
					<div class="item">11</div>
					<div class="item">12</div>
					<div class="item">13</div>
					<div class="item">14</div>
					<div class="item">15</div> -->
				</div>		
				
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	export default{
		methods:{
			initSize:function(){
				var _this = this;
				//离顶部距离
				var offsetTop = _this.$refs.home.offsetTop;
					//窗口的高度
				var height = window.screen.height;
				console.log(height)
				_this.$refs.home.style.height=(height-offsetTop)+'px'
			}
		},
		mounted:function() {
			var _this = this;
			_this.initSize();
			window.onresize=function(){
				_this.initSize();
			}
			if(!this.scroll){
				this.scroll = new BScroll(this.$refs.wrap,{
					click:true
				})
			}else{
				this.scroll.refresh();
			}

		}
	}
</script>
<style>
	.home{
		background: #F5F5F5;
		padding: 15px;
		box-sizing: border-box;
	}
	.content{
		height: 100%;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	.top{
		width: 100%;
		height: 100px;
		background: #fff;
		border-radius: 10px;
		position: absolute;
		top: 0;
		z-index: 10;
	}
	.wenzi{
		float: left;
		width: 62%;
		height: 100%;
		display: flex;
		padding-left: 10px;
		box-sizing: border-box;
		justify-content: center;
		flex-direction: column;
	}
	.wenzi p:nth-child(1){
		font-size: 19px;
		text-overflow:ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.wenzi p:nth-child(2){
		color: #999;
		font-size: 14px;
	}
	.days{
		display: inline-block;
		width: 38%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 10px;
		box-sizing: border-box;
	}
	.days p{
		font-size: 32px;
		font-weight: bold;
	}
	.days p span{
		font-size: 12px;
		vertical-align: text-top;
		background: #FF0000;
		color: #fff;
		padding: 0 2px;
		border-radius: 5px;
	}
	.list{
		width: 100%;
		height: 100%;
		padding-top: 100px;
		box-sizing: border-box;
	}
	.item{
		width: 100%;
		height: 40px;
		background: #FdFdFd;
		margin: 10px 0;
		border-radius: 10px;
		overflow: hidden;
	}
	.item div{
		height: 100%;
		float: left;
		line-height: 40px;
		box-sizing: border-box;
	}
	.item .desc{
		width: 64%;
		padding-left: 10px;
	}
	.item .num{
		width: 25%;
		background: #66B3FF;
		color: #fff;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
	}
	.item .tian{
		background: #0054A8;
		width: 11%;
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		text-align: center;
	}
</style>