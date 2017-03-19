(function(angular) {
    'use strict';
    // 1.0创建正在热映模块
    var app = angular.module("home_page", ["ngRoute", "http-server"]);

    // 2.0配置路由
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/home_page', {
            templateUrl: "./home_page/view.html",
            controller: "home_pageController"
        })
    }])

    // 3.0创建控制器
    app.controller("home_pageController", [
        "$scope",
        "$http",
        "$routeParams",
        "$route", // 这个参数是用来改变url中锚点值的
        "Myservice",
        function($scope, $http, $routeParams, $route, Myservice) {
            $scope.loading = true;
            // 利用postman解析的假数据
            // $scope.data;

            // 利用angular的http发送请求数据
            // then的第一个参数是成功的回调函数，第二个参数是失败的回调函数
            // $http.get('./movie_list/movie_list.json').then(function(response) {
            // 将请求到的数据通过$scope.data暴露出去
            // $scope.data = response.data;

            //angular中的跨域请求需要加上JSON_CALLBACK参数
            // 由于angular不支持这种有点的参数，所以不能用angular的jsonp方法，需要自己封装一个跨域请求方法
            // $http.jsonp('http://api.douban.com//v2/movie/movie_list?JSON_CALLBACK').then(function(data) {
            //   console.log(data);
            // })

            // })

            // 使用Myservice服务来请求第三方api
            // 需要动态改变的是这个url的锚点值
            var url1 = "https://api.douban.com//v2/movie/in_theaters";
            Myservice.jsonp(url1, { start: 0, count:10 }, function(data) {
                // 因为angular请求数据是异步的，而js执行是同步的，所以angular不能自动检测到数据模型已发生改变并渲染数据
                // 这里就需要$apply方法去手动告诉angular数据模型发生改变时重新渲染数据
                // 但凡是异步操作，都需要这一句话
                $scope.data1 = data;
                $scope.loading = false;
                $scope.$apply();
            })
            var url2 = "https://api.douban.com//v2/movie/coming_soon";
            Myservice.jsonp(url2, { start: 0, count:10 }, function(data) {
                // 因为angular请求数据是异步的，而js执行是同步的，所以angular不能自动检测到数据模型已发生改变并渲染数据
                // 这里就需要$apply方法去手动告诉angular数据模型发生改变时重新渲染数据
                // 但凡是异步操作，都需要这一句话
                $scope.data2 = data;
                $scope.loading = false;
                $scope.$apply();
            })
            var url3 = "https://api.douban.com//v2/movie/top250";
            Myservice.jsonp(url3, { start: 0, count:10 }, function(data) {
                // 因为angular请求数据是异步的，而js执行是同步的，所以angular不能自动检测到数据模型已发生改变并渲染数据
                // 这里就需要$apply方法去手动告诉angular数据模型发生改变时重新渲染数据
                // 但凡是异步操作，都需要这一句话
                $scope.data3 = data;
                $scope.loading = false;
                $scope.$apply();
            })

        }
    ])
})(angular);
