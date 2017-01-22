'use strict';

angular.module('bloodrageBattleTimer').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {
            template: '<index-main></index-main>'
        }).
        when('/about', {
            template: '<about-main></about-main>'
        }).
        otherwise('/');
    }
]);
