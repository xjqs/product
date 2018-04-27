var gulp=require("gulp");
var gulpLoadPlugins=require("gulp-load-plugins");
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync');
var plugins=gulpLoadPlugins();
var rename=require("gulp-rename");
var minifyCss=require("gulp-minify-css");


//css压缩  一次性
gulp.task("cssMin",function(){
	var _DEST="static/css";
 
	gulp.src(["build/*.css"])
	.pipe(plugins.changed(_DEST))
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		path.extname=".min.css";//扩展名
	}))
//	dest输出到_DEST目录
	.pipe(gulp.dest(_DEST))
	.pipe(browserSync.stream());
});

//动态监听sass文件修改  编译并压缩
gulp.task("scss",function(){
	var _DEST="static/css";
	gulp.src(["build/*.scss"])
	.pipe(plugins.changed(_DEST))
	.pipe(plugins.sass())
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest(_DEST))
	.pipe(browserSync.stream());
});


//js压缩  一次性
gulp.task("jsMin",function(){
	var _DEST="static/js";

	gulp.src(["script/*.js"])
	.pipe(plugins.changed(_DEST))
	.pipe(plugins.uglify({
		mangle:false
	}))
	.pipe(plugins.rename(function(path){
		path.extname=".min.js";//扩展名
	}))
	.pipe(gulp.dest(_DEST))
	.pipe(browserSync.stream());

});


// browserSync刷新浏览器不需要安装插件
gulp.task('serve', ['scss','cssMin','jsMin'], function() {
	// 启服务,如果不启动服务无法刷新，用http-server也不行
    browserSync.init({
        server: "./"
    });

    gulp.watch("build/*.scss", ['scss']);
    gulp.watch("build/*.css", ['cssMin']);
    gulp.watch("html/*.html").on('change', browserSync.reload);
    gulp.watch("script/*.js", ['jsMin'])
});

//动态监听css文件改动
// gulp.task("cssWatch",function(){
// 	gulp.watch("build/*.css",["cssMin"],function(){
// 	});

// });
// //动态监听scss文件改动
// gulp.task("scssWatch",function(){
// 	gulp.watch("build/*.scss",["scss"],function(){
// 	});
	
// });

// //动态监听js文件改动
// gulp.task("jsWatch",function(){
// 	gulp.watch("script/*.js",["jsMin"],function(){
// 	});
// });
/*改动后自动刷新 需要安装插件livereload*/
// gulp.task('watch', function() {
//     // livereload.listen();
//     // gulp.watch('*/*.*',function(file){
//     //     livereload.changed(file.path);
//     // });
// });

// //监听所有改动  js  css scss
// gulp.task("allWatch",function(){
// 	gulp.run(["cssWatch","jsWatch","scssWatch","watch"]);
// });

gulp.task("default",function(){
	console.log("请输入具体任务名称");
	console.log("css压缩：gulp cssMin");
	console.log("scss压缩：gulp scss");
	console.log("js压缩：jsMin");

	// console.log("scss监听并压缩：gulp scssWatch");
	// console.log("css监听并压缩：cssWatch");
	// console.log("js监听并压缩：jsWatch");

	// console.log("css、js、scss监听并压缩及刷新：allWatch");
	console.log("css、js、scss监听，压缩，刷新：serve");
});