(function(angular) {
	'use strict';
	// 1.0 创建http-server模块
	var app = angular.module('http-server', []);

	// 2.0 创建服务
	// angular中有自己的全局对象$window，要用这个来代替window
	app.service('Myservice', ['$window', function($window) {
		this.jsonp = function (url, arg, fn) {
        var queryString = '';

        for (var key in arg) {
            queryString += key + '=' + arg[key] + '&';
        }
        url = url + '?' + queryString;

        var mycallbackName = "jsonp_" + Math.random().toString().substr(2);
        $window[mycallbackName] = function(data) {
            fn(data);
            $window.document.body.removeChild(scriptEle); //这里形成的是一个闭包
        }
        url = url + "callback=" + mycallbackName;

        var scriptEle = $window.document.createElement('script');
        scriptEle.src = url;
        $window.document.body.appendChild(scriptEle);
    }
	}])
})(angular)

