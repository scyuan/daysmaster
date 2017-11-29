<template>
	<div class="historytoday" ref='historytoday'>
		<div class="today" style="height:110px">
			<div class="year">{{today.year}}</div>,
			<div class="month">{{today.month}}</div>,
			<div class="day">{{today.day}}</div>
			<div class="hengxin"></div>
		</div>
		<div class="list-wrap" ref='listwrap'>
			<div class="content">
				<div class="item" v-for='item in list'>
					<div class="year">{{item.year}}</div>
					<div class="title">{{item.title}}</div>
				</div>
			</div>
		</div>
	</div>  
</template>
<script>
import BScroll from 'better-scroll';
	export default{
		data:function(){
			return {
				today:{},
				list:null
			}
		},
		methods:{
			initSize:function(){
				var _this = this;
				//离顶部距离
				var offsetTop = _this.$refs.historytoday.offsetTop;
					//窗口的高度
				var height = window.screen.height;
				console.log(height)
				_this.$refs.historytoday.style.height=(height-offsetTop)+'px'

				//初始化.list-wrap的高度
				_this.$refs.listwrap.style.height = (height-offsetTop-110) + 'px';
			}
		},
		mounted(){

			var _this = this;
			_this.initSize();
			window.onresize=function(){
				_this.initSize();
			}
			//获取今日时间
			var year = this.$moment().year();
			var month = this.$moment().month();
			var day = this.$moment().date();
			this.today = {
				year:year,
				month:month+1,
				day:day
			}

			//post获取数据
			var param = 'showapi_appid=50890&showapi_sign=7209f2aabb4e49fdaf96b50f7f187b51'
			this.$http.post('/119-42',param).then(function(res){
				console.log(res);
				_this.list = res.data.showapi_res_body.list;
				_this.$nextTick(function(){
					if(!_this.scroll){
						_this.scroll = new BScroll(_this.$refs.listwrap,{
							click:true
						})
					}else{
						_this.scroll.refresh();
					}
				})
			})

			
		}
	}
</script>
<style scoped>
	.item{
		height: 60px;
		padding: 0 40px;
		box-sizing: border-box;
		display: flex;
	}
	.item .year{
		padding-top:11px;
		font-size: 22px;
		padding-right: 25px;
		font-weight: bold;
		text-align:right;
		width: 20%;
	}
	.item .title{
		padding-top: 10px;
		width: 80%;
	}
	.historytoday{
		background: #F5F5F5;
		box-sizing: border-box;

	}
	.today{
		background: #fff;
		box-shadow: 0px 20px 100px rgba(0,0,0,0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bolder;
		font-size: 55px;
		position: relative;
	}
	.today .year,.today .month{
		margin-right: 15px;
	}
	.today .month,.today .day{
		margin-left: 15px;
	}
	.today .hengxin{
		width: 100%;
		height: 4px;
		position: absolute;
		top: 53px;
		left: 0;
		background: #fff;
		z-index: 100;
	}
	.list-wrap{
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
</style>