define(function(require, exports, module) {
    var API = require('api');  
    function test(listType){
        var _self=this;		
        _self.type = listType;
    }
    test.prototype={
		constructor:test,
        init:function(){
            var _self=this;
            _self.bindEvent();
            _self.bindclick();
        },
        bindEvent:function(){
            $("#test").html('<option orgId="">全部</option>');
            API.test().done(function(data){
                 for(var i=0;i<data.length;i++){        
                    $("#test").append('<option orgId="'+data[i].id+'">'+data[i].firstName+'</option>');
                };   
            }).fail(function(data){

            });
        },
        bindclick:function(){
            $("#button").click(function(){
                var id=$("#test option:selected").attr('orgId');
                var param={
                    orgId:id,
                }
                API.test(param).done(function(data){
                    $("#button").css('backgroundColor','#f00');  
                })
            })
        }
    }
    module.exports = {
        test: test         
    };
})