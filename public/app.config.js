'use strict';

angular.module('bloodrageBattleTimer').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/', {
            template: '<index-main></index-main>'
        }).
        otherwise('/');
    }
]);
