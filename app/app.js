(function(angular) {
    // start working!
    'use strict';
    var app = angular.module('DoubanMovie', [
        'details',
        'home_page',
        'movie_list',
        'auto-active'
    ]);

    // 配置路由
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home_page'
        })
    }]);

    // 创建控制器
    app.controller('mainController', ['$scope', '$location', function($scope, $location) {
        $scope.query = '';
        $scope.search = function() {
            // 穿入一个字符串参数，就是用来改变字符串的锚点值
            $location.url('/search?q=' + $scope.query);
        }
    }]);

})(angular);
