var dateUtil ={
	//通过date获取是周几
	getWeek:function(date){
		var week = date.getDay();
		switch(week){
			case 0:
				week = '星期日';
				break;
			case 1:
				week = '星期一';
				break;  
			case 2:
				week = '星期二';
				break;
			case 3:
				week = '星期三';
				break;
			case 4:
				week = '星期四';
				break;
			case 5:
				week = '星期五';
				break;
			case 6:
				week = '星期六';
				break;
		}

		return week;
	},
	//计算两日期相差天数
	//params:true-算绝对值，false-不算绝对值
	getDiff:function(date1,date2,bool){
		console.log(date1+'-'+date2);
		var date1 = new Date(date1).getTime();
		var date2 = new Date(date2).getTime();

		if(bool){
			return parseInt(Math.abs(date2-date1)/1000/60/60/24)
		}else{
			return parseInt((date2-date1)/1000/60/60/24)
		}
	},
	//初始化当打开picker时，所需要的datas
	initCalendarPickerDatas(){
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
		return datas;
	},
}
export{
	dateUtil
}