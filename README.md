#Wenroo - WebApp

## 解决方案
- [MV*](#MVC) - JavaScript Web Applications
- [Meta Information](#meta) - 页面信息的设定
- [Browser Reset](#reset) - RESET和浏览器兼容
- [Sublime plugin](#sublime) - Sublime 插件

## 类库

* 方案一：[Backbone](https://github.com/jashkenas/backbone)
> - [Underscore](https://github.com/jashkenas/underscore)
> - [Backbone Marionette](https://github.com/marionettejs/backbone.marionette)
> - [Backbone Radio](https://github.com/marionettejs/backbone.radio)
> - [Jquery](https://github.com/jquery/jquery)

* 方案二：

##META 设置

* [adaptUILayout.js](https://github.com/wenroo/wenroo/blob/master/webapp-cookbook/adaptUILayout.js) - 解决安卓老版本浏览器定宽同时禁止缩放设置无效的问题。
> 基础版本代码来自于:[定宽网页设计下，固定宽度布局开发WebApp并实现多终端下WebApp布局自适应](http://www.cnblogs.com/plums/archive/2013/01/10/WebApp-fixed-width-layout-of-multi-terminal-adapter-since.html)
> - 去除对于IOS的设置
> - 增加安卓版本的判断
> - 去除固定的DOM对象的控制
> - 增加Require引入

## RESET 和设备兼容

* 去除Tap Highlight
> WEBKIT: -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
> IE    : <meta name="msapplication-tap-highlight" content="no" />

* Scroll优化
> WEBKIT: -webkit-overflow-scrolling : touch;
> - WebKit 108400+, iOS 5.0+, Android4.0+

## Sublime 插件大全

* [sublime Markdown Preview] - 本地生成HTML预览
> 操作：Command + shift + p > preview in browser