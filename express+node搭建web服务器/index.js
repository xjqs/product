/*npm init 创建package.json
先引入引入express ：$ cnpm install express –save
通过get方法来设置匹配参数的路由，通过在回调函数的req中可以获取请求参数和地址。
post请求在获取参数的时候要引入body-parser 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var hostName = '127.0.0.1';
var port = 8081;
app.use(express.static('public'));
// 匹配 /index 路径的请求
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.listen(port,hostName,function(){

   console.log(`服务器运行在http://${hostName}:${port}`);

});