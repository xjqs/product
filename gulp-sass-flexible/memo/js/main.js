
(function ($) {
    //构造器
    function main() {
    	
        /*this.API=new Sbs.module.API();*/
    }
    main.prototype = {
        constructor: main,
        init:function(){
            var _self=this;
            $('#header').load('header.html');
	        $('#nav').load('navagition.html',function(){
	        	_self.bindEvents();
	        });
           /* $('#userName').text(cLib.base.getCookie('userName'));*/
            $('#exit').on('click',function(){
            	/*cLib.base.setCookie("password",'');*/
            	window.location.href="login.html"
            })
            $('#editPassword').bind('click',function(){
            	/*_self.editPassword();*/
            })
           /* $('#contentIn').height($('#conRight').height()-$('#conCurPostion').height())*/
            
        },
        bindEvents:function(){
        	var _self=this;
        	/*_self.menu();*/
        	_self.operatefn();
        },
        //菜单渲染
        menu:function(){
        	var _self=this;
        	_self.API.menu().done(function(res){
        		if(res.ret==0){
        			var data=res.data;
        			//权限导入数组
        			var strdata='';
        			$.each(data,function(i){
        				if(data[i]['type']==2){
        					strdata+=data[i]['menuKey']+',';
        				}
        			})
        			$('#powerdata').attr('powerdata',strdata.substring(0,strdata.length-1));
        			/*菜单*/
        			$('#navUl').html('');
        			$.each(data,function(i){
        				if(data[i]['parentId']==0){
        					if(data[i]['url']!=''){
        						$('#navUl').append('<li datatype='+data[i]['type']+' dataid="'+data[i]['id']+'" class="specialUrl"><a href="'+Sbs.basePrefixURL+data[i]['url']+'" target="downcon">'+
            			                '<p class="navTitle"><span>'+data[i]['name']+'</span></p>'+
            			                '</a>'+
            			            '</li>')
        					}else{
        						$('#navUl').append('<li datatype='+data[i]['type']+' dataid="'+data[i]['id']+'">'+
            			                '<p class="navTitle"><span>'+data[i]['name']+'</span></p>'+
            			            '</li>')
        					}
        				}
        			})
        			$.each(data,function(i){    					
    					if(data[i]["type"]==1){
    						var obj=$('#navUl li[dataid='+data[i]['parentId']+']');
    						if(obj.find('ul').length==0){
    							obj.append('<ul class="sUl"><li datatype='+data[i]['type']+'><a href="'+Sbs.basePrefixURL+data[i]['url']+'" target="downcon">'+data[i]['name']+'</a></li></ul>');
    						}else{
    							obj.find('ul').eq(0).append('<li datatype='+data[i]['type']+'><a href="'+Sbs.basePrefixURL+data[i]['url']+'" target="downcon">'+data[i]['name']+'</a></li>');
    						}
    					}
    				})
        		}else{
        			window.location.href="login.html";
        		}
        	})
        },
        //页面操作
        operatefn:function(){   
        	/*初始化*/
        	$('#navUl li').eq(0).find(".sUl").show();
        	$('#navUl li').eq(0).find(".sUl").find('li:eq(0)').find('a').addClass('change');
        	/*var text1=$('#navUl li').eq(0).addClass('active').find('.navTitle span').text();
            var text2=$('#navUl li').eq(0).find(".sUl").find('li:eq(0)').addClass('change').find('a').text();
            $('#currPage').text(text1+'>'+text2);*/
        	//主页tab点击效果
            $('.navTitle').click(function(){
                $(this).parent('li').siblings().find('ul').hide();
                $(this).parent('li').find('ul').toggle();
                /*$('#currPage').text($(this).find('span').text());*/
                if($(this).parent('li').hasClass('active')){
                	$(this).parent('li').removeClass('active');
               	
                }else{
                	$(this).parent('li').addClass('active').siblings().removeClass('active');
                	$(".specialUrl").removeClass('specialchange');
                }
            })
            /*点击二级菜单，添加效果*/
            $(".sUl li a").on('click',function(e){          	
            	e.stopPropagation(); 
            	/*if($(this).attr('datatype')==0){
            		$(this).addClass('active').siblings().removeClass('active');
            		$('#currPage').text($(this).find('.navTitle span').text());
            	}else{*/
            	    
            		$(".sUl li a").removeClass('change');
                	$(this).addClass('change');
            		/*$(this).parents('li').addClass('active').siblings().removeClass('active');*/
            		var ftext=$(this).parents('.sUl').siblings('.navTitle').find('span').text();
            		var stext=$(this).text();
            		$('#currPage').text(ftext+'>'+stext);
            	/*}*/
            })
            /*特殊菜单，只有一级*/
            $(".specialUrl").on('click',function(){
            	$(this).addClass('specialchange').siblings('li').removeClass('active');
            	$(".sUl li a").removeClass('change');
            	$(this).siblings('li').find('ul').hide();
                $('#currPage').text($(this).find('p').find('span').text());
            });
        },
        editPassword:function(){
        	var _self=this;
        	var html='<div class="layerCon">'+
				        '<p class="txtWrap" style="width:100%;">'+
				            '<span class="txtName">输入旧密码：</span>'+
				            '<input type="password" id="oldPass"/>'+
				        '</p><br/>'+
				        '<p class="txtWrap" style="width:100%;" >'+
				            '<span class="txtName">输入新密码：</span>'+
				            '<input type="password" id="newPass"/>'+
				        '</p><br/>'+
				        '<p class="txtWrap" style="width:100%;">'+
				            '<span class="txtName" >确认新密码：</span>'+
				            '<input type="password" id="newAgain"/>'+
				        '</p>'+
				        '</div>';
	        	 layer.open({
	                 type: 1,
	                 title:'修改密码',
	                 skin: 'layui-layer-rim', //加上边框
	                 area: ['350px', '280px'],
	                 zIndex:500,
	                 shadeClose: false, //点击遮罩关闭
	                 content: html,
	                 btn: ['确定','关闭'],
	                 success:function(){
	                	 
	                 },
	                 yes: function (index, layero) {
	                	 var oldPass=$.trim($('#oldPass').val());
	                	 var newPass=$.trim($('#newPass').val());
	                	 var newAgain=$.trim($('#newAgain').val());
	                	 if(oldPass==""){
	                		 layer.msg("请输入旧密码！");
	                		 return false;
	                	 }else if(newPass==''){
	                		 layer.msg("请输入新密码！");
	                		 return false;
	                	 }else if(newAgain==''){
	                		 layer.msg("请确认新密码！");
	                		 return false;
	                	 }else if(newAgain!=newPass){
	                		 layer.msg("新密码输入不一致！");
	                		 return false;
	                	 }else{
	                		 var subData={
	                				 oldPass :cLib.base.md5(oldPass),
	                				 newPass :cLib.base.md5(newPass)
	                		 }
	                		 _self.API.upDatePass(subData).done(function(res){
	                			 if(res.ret==0){
	                				 layer.msg("修改成功！");
	                				 layer.close(index);
	                				 $('#exit').click();
	                			 }else{
	                				 layer.msg(res.desc);
	                			 }
	                		 })
	                	 }
	                 },
	                 btn2: function (index, layero) {
	                     layer.close(index);
	                 }
        	 })
        }
    
    }
    memo.module["main"] = main;
})(jQuery)