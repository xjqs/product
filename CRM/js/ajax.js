~function (){
    function createXHR(){
        var xhr = null;
        var flag = false;
        var ary = [
            function (){
                return new XMLHttpRequest;
            },
            function (){
                return new ActiveXObject('Microsoft.XMLHTTP');
            },
            function (){
                return new ActiveXObject('Msxml2.XMLHTTP');
            },
            function (){
                return new ActiveXObject('Msxml3.XMLHTTP');
            }
        ];
        for(var i=0;i<ary.length;i++){
            var curFn = ary[i];
            try{
                xhr = curFn();
                createXHR = curFn;
                flag = true;
                break;
            }catch(e){

            }
        }
        if(!flag){
            throw new Error("您的浏览器不支持ajax，请升级您的浏览器");
        }
        return xhr;
    }
    function ajax(options){
        var _default = {
            url:"",
            method:"get",
            async:true,
            timeout:1000,
            dataType:"json",
            data:null,
            success:null
        };
        for(var key in options){
            _default[key] = options[key];
        }
        if(_default.method === "get"){
            _default.url.indexOf("?") < 0 ? _default.url += "?" : _default.url += "&";
            _default.url += "_=" + Math.random();
        }
        var xhr = createXHR();
        xhr.open(_default.method,_default.url,_default.async);
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                var val = xhr.responseText;
                if(_default.dataType === "json"){
                    val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                }
                _default.success && _default.success.call(xhr,val);
            }
        };
        xhr.send(_default.data);
    }
    window.ajax = ajax;
}();
