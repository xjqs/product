/**
 * Created by wangpeng on 2016/8/8.
 */
seajs.config({
	alias : {
		'jquery' : 'lib/jquery-1.8.3.min',// 简化调用jquery
        'test':'static/js/test.min',
        'api':'static/js/api.min',
        'baseCss':'static/css/index.min.css'
	},
	//发版修改 版本号
	map : [ [ /^(.*\/.*\.(?:css|js|html))(?:.*)$/i, '$1?2016101001' ] ],
    // 预加载项
    preload : [ 'baseCss','jquery' ],
    // Sea.js 的基础路径
    base : '../',
   // base : '../webapp/',
    // 文件编码
    charset: 'utf-8'
});
