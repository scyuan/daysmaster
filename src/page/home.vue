<template>
	<div class="home" ref="home">
		<div class="content" ref='content'>
			<div class="top">
				<div class="wenzi">
					<p>{{zhiding.desc}}</p>
					<p>{{zhiding.full_time}}</p>
				</div>
				<div class="days">
					<p>{{zhiding.days}}<span>days</span></p>
				</div>
			</div>
			<div class="list" ref="wrap">
				<div class="items">
					<div class="item" v-for='(item,index) in list' @click='detail(index)'>
						<div class="detail">
							<div class="desc">{{item.desc}}</div>
							<div class="num" v-if='!isBefore(item.time)'>{{item.days}}</div>
							<div class="tian" v-if='!isBefore(item.time)'>天</div>

							<div class="num num_yellow" v-if='isBefore(item.time)'>{{item.days}}</div>
							<div class="tian tian_yellow" v-if='isBefore(item.time)'>天</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<detail ref='detail' v-on:openedit='openEdit'></detail>
		<edit ref='edit'></edit>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import Detail from '../components/detail'
	import Edit from '../components/edit'

	export default{
		data:function(){
			return{
				list:[],
				zhiding:{

				}
			}
		},
		components:{
			Detail,Edit
		},
		methods:{
			openEdit(obj){
				this.$refs.detail.isHide();
				this.$refs.edit.show(obj);
			},
			detail(index){
				this.$refs.detail.isShow(this.list[index],index);
			},
			isBefore(time){
				var date = new Date();
				var now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
				if(this.$moment(time).isBefore(now)){
					return true;
				}else{
					return false;
				}
			},
			refresh:function(){
				this.getData();
			},
			initSize:function(){
				var _this = this;
				//离顶部距离
				var offsetTop = _this.$refs.home.offsetTop;
				//窗口的高度
				var height = window.screen.height;

				_this.$refs.home.style.height=(height-offsetTop)+'px'

				//初始化list的高度
				this.$refs.wrap.style.height = (height-offsetTop-130) + "px";
			},
			computeDayas(day){
				var now  = new Date();
				var curr = new Date((now.getMonth()+1)+'-'+now.getDate()+'-'+now.getFullYear());
				var inputDate = day.split('-');
				var idate = new Date(inputDate[1]+'-'+inputDate[2]+'-'+inputDate[0]);
				return parseInt(Math.abs(curr-idate)/1000/60/60/24)
			},
			pullData:function(){
				this.$store.commit('f5records');
			},
			getData(){
				//从store中拉取数据------第一次进来，store要从缓存中拉取数据
				
				this.pullData();

				var list = this.$store.state.records;

				for(let i=0;i<list.length;i++){
					list[i].days = this.computeDayas(list[i].time);
				}
				this.list = list;
			
				//置顶
				for(let i=0;i<list.length;i++){
					if(list[i].zhiding){
						this.zhiding = list[i];
						break ;
					}
				}

				var date = new Date();
				var now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
				if(this.$moment(this.zhiding.time).isBefore(now)){
					if(this.zhiding.full_time.match('起始日')=='起始日'){}else{
						this.zhiding.full_time = '起始日：'+ this.zhiding.full_time
					}
				}else{
					if(this.zhiding.full_time.match('目标日')=='目标日'){}else{
						this.zhiding.full_time = '目标日：'+ this.zhiding.full_time
					}
				}
			}
		},
		beforeCreate () {
		   console.group('%c%s', 'color:green', 'beforeCreate 创建前状态===============组件home》')
		 },
		 beforeMount () {
		   console.group('%c%s', 'color:green', 'beforeMount 挂载前状态===============组件home》')
		 },
		created:function(){
			console.group('%c%s', 'color:green', 'created 创建完状态===============组件home》')
			this.getData();			
		},
		mounted:function() {
			console.group('%c%s', 'color:green', 'mounted 挂载状态===============组件home》')
			var _this = this;
			_this.initSize();
			window.onresize=function(){
				_this.initSize();
			}
			_this.$nextTick(function(){
				if(!_this.scroll){
					_this.scroll = new BScroll(_this.$refs.wrap,{
						click:true
					})
				}else{
					_this.scroll.refresh();
				}
			})
			console.log(document.getElementsByClassName('home')[0])
		}
	}
</script>
<style scoped>
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
		box-sizing: border-box;
		overflow: hidden;
	}
	.item{
		width: 100%;
		height: 50px;
		border-radius: 10px;
		display: flex;
		align-items: center;
	}
	.detail div{
		height: 100%;
		float: left;
		line-height: 40px;
		box-sizing: border-box;
	}
	.item .detail{
		height: 40px;
		width: 100%;
		border-radius: 10px;
		box-shadow: 0px 1px 10px rgba(0,0,0,0.1);
		overflow: hidden;
	}
	.detail .desc{
		width: 64%;
		padding-left: 10px;
		background: #fff;
	}
	.detail .num{
		width: 25%;
		background: #66B3FF;
		color: #fff;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
	}
	.detail .tian{
		background: #0054A8;
		width: 11%;
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		text-align: center;
	}
	.detail .num_yellow{
		background: #FFA044;
	}
	.detail .tian_yellow{
		background: #B05800;
	}
</style>