<template>
	<transition name='slide'>
		<div class="remind" v-show='show'>
			<div class="header">
		    <i class="icon icon-list" @click='back()'>&#xe666;</i>
		    <p>提醒设置</p>
		    <i class="icon icon-add" @click='save()'>完成</i>
		</div>
		<div class="content">
			<div class="form">
				<div class="input_group" v-on:click='select(index)' v-bind:class='{nobb:index==list.length-1}' v-for='(item,index) in list'>
					<p>{{item.text}}</p>
					<i class="icon" v-show='item.select'>&#xe685;</i>
				</div>
			</div>
		</div>
		</div>
	</transition>
</template>
<script>
	export default{
		data(){
			return {
				show:false,
				list:[
					{
						text:'不提醒',
						select:false
					},
					{
						text:'每日提醒',
						select:false
					},
					{
						text:'每周提醒',
						select:false
					},
					{
						text:'每月提醒',
						select:false
					},
					{
						text:'每年提醒',
						select:false
					},
				],
				currIndex:0
			}
		},
		methods:{
			select(index){
				var tempList = this.list;
				for(let i = 0;i<tempList.length;i++){
					tempList[i].select = false;
				}
				tempList[index].select = true;
				this.list = tempList;
				this.currIndex = index;
			},
			isShow(remind){
				this.show = true;
				var tempList = this.list;
				for(let i = 0;i<tempList.length;i++){
					if(tempList[i].text==remind){
						tempList[i].select = true;
						this.currIndex = i;
					}
				}
				this.list = tempList;
			},
			isHide(){
				this.show = false;
			},
			back(){
				this.isHide();
			},
			save(){
				this.$emit('returnremind',this.list[this.currIndex].text);
				this.isHide();
			}
		}
	}
</script>
<style scoped>
	.slide-enter,.slide-leave-to{
		transform: translateY(100%);
	}
	.slide-enter-to,.slide-leave{
		transform: translateY(0);
	}
	.slide-enter-active,.slide-leave-active{
		transition: all 0.5s ease;
	}
	.remind{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 110;
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
		height: 40px;
		width: 100%;
		padding:0 14px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
		line-height: 40px;
	}
	.nobb{
		border-bottom: 0;
	}
	.input_group p{
		float: left;
		color: #666;
	}
	.input_group i{
		float: right;
		color: #1E90FF;
	}
</style>