/**
 * Created by Chen on 15/5/24.
 */

//S-公用

//S-时间格式化
Handlebars.registerHelper("dateFormatStyle",function(value,style){
    function formatDate(now) {
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        if(second < 10)
        {
            second = '0' + second;
        }
        if(minute < 10)
        {
            minute = '0' + minute;
        }
        if(style ==1 ){//格式:2014-08-15 00:00:00
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        }else if(style == 2){//格式:2014-08-15 00:00
            return year+"-"+month+"-"+date+" "+hour+":"+minute;
        }else if(style == 3){//格式:2014/08/15
            return year+"/"+month+"/"+date;
        }else if(style == 4){//格式:2014-08-15
            return year+"-"+month+"-"+date;
        }
    }
    if(value==null ||value==''){
        return '';
    }
    var d = new Date(parseInt(value)*1000);
    return formatDate(d);
});

//E-时间格式化

//S-文本截取
Handlebars.registerHelper("hideText",function(value,num){
    if(value.length > num)
    {
        return new Handlebars.SafeString(value.substr(0,num)+'…');
    }
    else
    {
        return value;
    }

});
//E-文本截取

//E-公用


//数字截取2位
Handlebars.registerHelper("foramt2",function(d){
	if(!d){
		return d;
	}
	d=d+"";//变成字符串
	var arr=d.split(".");
	if(arr.length==2){
		var floats=arr[1]+"00";
		return arr[0]+"."+floats.substr(0,2);
	}
	return d;
});

//手机号码截取
Handlebars.registerHelper("telHide",function(phone,options){
	return phone.substr(0,3)+"****"+phone.substr(7,11);
});
