var http = require("http"),fs = require("fs"),url = require("url");
var server = http.createServer(function (req,res){
    var urlObj = url.parse(req.url,true);
    var path = urlObj.pathname;
    var query = urlObj.query;

    var reg = /\.(CSS|JS|HTML|JSON|ICO)/i;
    if(reg.test(path)){
        var suffix = reg.exec(path)[1].toLowerCase();
        var suffixMIME = "text/plain";
        switch (suffix){
            case "html":
                suffixMIME = "text/html";
                break;
            case "css":
                suffixMIME = "text/css";
                break;
            case "js":
                suffixMIME = "text/javascript";
                break;
            case "json":
                suffixMIME = "application/json";
                break;
            case "ico":
                suffixMIME = "application/octet-stream";
                break;
        }
        try{
            var conFile = fs.readFileSync('.' + path,'utf-8');
            res.writeHead(200,{'Content-type':suffixMIME + ";charset=utf-8;"});
            res.end(conFile);
        }catch(e){
            res.writeHead(404,{'Content-type':'text/plain;charset=utf-8'});
            res.end("this file is not found");
        }
    }
    var customPath = "js/custom.json";
    var con = fs.readFileSync(customPath,'utf-8');
    con = JSON.parse(con);
    var result = {code:1,msg:"",data:null};
    var customId = query["id"];
    res.writeHead(200,{'Content-type':'application/json;charset=utf-8;'});

    //1,获取客户列表
    if(path == "/getList"){
        result.msg = "请求失败";
        if(con.length > 0){
            result = {
              code:0,
              msg:"成功",
              data:con
            };
        }
        res.end(JSON.stringify(result));
        return;
    }
    //2,删除某个客户信息
    if(path === "/removeInfo"){
        result.msg = "删除失败";
        var flag = false;
        for(var i=0;i<con.length;i++){
            if(con[i].id == query.id){
                con.splice(i,1);
                flag = true;
                break;
            }
        }
        if(flag){
            fs.writeFileSync(customPath,JSON.stringify(con),'utf-8');
            result = {
                code:0,
                msg:"删除成功"
            };
        }
        res.end(JSON.stringify(result));
        return;
    }
    //3,增加客户信息
    if(path === "/addInfo"){
        var str = "";
        req.on('data',function (chunk){
           str += chunk;
        });
        req.on('end',function (){
            var data = JSON.parse(str);
            for(var key in data){
                if(data[key] == ""){
                    res.end(JSON.stringify({
                        code:1,
                        msg:"新增失败"
                    }));
                    return;
                }
            }
            data.id = con.length == 0 ? 1 : parseFloat(con[con.length-1].id) + 1;
            con.push(data);
            fs.writeFileSync(customPath,JSON.stringify(con),'utf-8');
            res.end(JSON.stringify({
                code:0,
                msg:"新增成功"
            }));
        });
    }
    //4，获取单个客户信息
    if(path == "/getInfo"){
        result.msg = "获取失败";
        for(var i=0;i<con.length;i++){
            if(con[i].id == customId){
                result = {
                    code:0,
                    msg:"获取成功",
                    data:con[i]
                };
            }
        }
        res.end(JSON.stringify(result));
        return;
    }
    //5,修改客户信息
    if(path === "/updateInfo"){
        var str = "";
        req.on('data',function (chunk){
            str += chunk;
        });
        req.on('end',function (){
           result.msg = "修改失败";
           var data = JSON.parse(str);
           var flag = false;
           for(var i=0;i<con.length;i++){
               if(con[i].id == data.id){
                   con[i] = data;
                   flag = true;
                   break;
               }
           }
           if(flag){
               fs.writeFileSync(customPath,JSON.stringify(con),'utf-8');
               result = {
                   code:0,
                   msg:"修改成功"
               };
           }
           res.end(JSON.stringify(result));
        });
    }
});
server.listen(8085, "127.0.0.5",function (){
    console.log("端口81监听成功");
});