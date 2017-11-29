<template>
	<div class="picker">
		
	</div>
</template>
<script>
	import Picker from 'better-picker'
	export default{
		data:function(){
			return {
				show:false,
				picker:null,
				type:null
			}
		},
		methods:{
			isShow(funcName,datas){
				this.initPicker(funcName,datas);
			},
			isHide(){
				this.show=false;
			},
			initPicker(funcName,datas){
				var data1 = null;
				var data2 = null;
				var data3 = null;
				var selectedIndex = []
				switch(datas.length){
					case 1:
						selectedIndex=[0]
						data1 = datas[0];
						break;
					case 2: 
						selectedIndex=[0,1]
						data1 = datas[0]
						data2 = datas[1]
						break;
					case 3:
						selectedIndex=[0,1,2]
						data1 = datas[0]
						data2 = datas[1]
						data3 = datas[2]
						break;
				}
				if(this.picker==null){
					var picker = new Picker({
						data: datas,
						selectedIndex: selectedIndex,
						title: '请选择'
					});
					this.picker = picker;
				}
				var _this = this;
				this.picker.on('picker.select', function (selectedVal, selectedIndex) {
					switch(datas.length){
						case 1:
							_this.$emit(funcName,{a:data1[selectedIndex[0]].value})
							break;
						case 2: 
							_this.$emit(funcName,{a:data1[selectedIndex[0]].value,b:data2[selectedIndex[1]].value})
							break;
						case 3:
							_this.$emit(funcName,{a:data1[selectedIndex[0]].value,b:data2[selectedIndex[1]].value,c:data3[selectedIndex[2]].value})
							break;
					}
					_this.picker = null;
					
				})
				this.picker.on('picker.cancel',function(){
					_this.picker = null;
				})
				this.picker.on('picker.change', function (index, selectedIndex) {
					
				});

				this.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
					console.log(selectedVal);
					console.log(selectedIndex);
				});
				
				this.picker.show(function(){
					var now = new Date();
					var year = now.getFullYear();
					var month = now.getMonth()+1;
					var date = now.getDate();
					for(let i=0;i<data1.length;i++){
						if(data1[i].value == year){
							_this.picker.scrollColumn(0,i);
						}
					}
					for(let i=0;i<data2.length;i++){
						if(data2[i].value == month){
							_this.picker.scrollColumn(1,i);
						}
					}
					for(let i=0;i<data3.length;i++){
						if(data3[i].value == date){
							_this.picker.scrollColumn(2,i);
						}
					}
					
				});
			}
		}
	}
</script>
<style>
	
</style>