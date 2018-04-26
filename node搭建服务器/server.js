/*首先最上面的require表示需要用到那几个模块，先引用一下；
arg表示输入的命令行的第三个参数，上面是做了手动截取；
createServer方法表示创建一个http服务，以函数为参数，本文代码中传入了一个匿名函数；
req，表示http request(请求)对象，其携带着来自客户端此次http请求的相关信息，例如请求method、请求query参数、请求header头信息等；
res，表示http response(返回)对象，用来给客户端返回请求资源用，可以手动添加信息，例如返回的数据、返回的头信息等、返回的code等；
fs，表示文件资源对象，具体可以访问nodejs官网的api；
path，表示资源路径对象，具体可以访问nodejs官网的api。
listen表示创建的服务监听，一旦访问了此端口，将进入此前的匿名函数回调中，将资源返回给客户端。*/

var http = require('http');
 var url = require('url');
 var path = require('path');
 var fs = require('fs');
 
 var dir, arg = process.argv[2] || ''; // 命令行第三个参数，用来接收目录，可为空，相对当前server.js文件的目录名称
 // 比如使用命令 node server debug，意思就是debug文件夹与server.js文件同级
 // 且你想以debug文件夹启动web服务
 
 http.createServer(function (req, res) {
 var pathname = __dirname + url.parse(req.url).pathname;
 dir = dir ? dir : pathname; // 记住dir(目录)
 pathname = dir ? pathname.replace(dir, dir + arg + '/') : pathname; // 替换文件静态路径
 if (path.extname(pathname) == "") {
 pathname += "/";
 }
 if (pathname.charAt(pathname.length - 1) == "/") {
 pathname += "index.html"; // 入口文件，此处默认index.html
 }
 
 fs.exists(pathname, function (exists) {
 if (exists) {
 switch (path.extname(pathname)) {
 case ".html":
 res.writeHead(200, {"Content-Type": "text/html"});
 break;
 case ".js":
 res.writeHead(200, {"Content-Type": "text/javascript"});
 break;
 case ".css":
 res.writeHead(200, {"Content-Type": "text/css"});
 break;
 case ".gif":
 res.writeHead(200, {"Content-Type": "image/gif"});
 break;
 case ".jpg":
 res.writeHead(200, {"Content-Type": "image/jpeg"});
 break;
 case ".png":
 res.writeHead(200, {"Content-Type": "image/png"});
 break;
 default:
 res.writeHead(200, {"Content-Type": "application/octet-stream"});
 }
 
 // res可以自己添加信息来简单交互 比如可以修改点header信息 或者修改返回的资源数据
 fs.readFile(pathname, function (err, data) {
 res.end(data);
 });
 }
 else {
 res.writeHead(404, {"Content-Type": "text/html"});
 res.end("<h1>404 Not Found</h1>");
 }
 });
 }).listen(8085, "127.0.0.5"); // 服务器端口
 
 console.log("server running at http://127.0.0.5:8085/");