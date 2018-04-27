/**
 * Created by wangpeng on 2016/8/8.
 */
seajs.config({
	alias : {
		'jquery' : 'script/jquery-1.8.3.min',// 简化调用jquery
        'test':'script/test',
        'api':'script/api',
        'baseCss':'css/base.css'
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
