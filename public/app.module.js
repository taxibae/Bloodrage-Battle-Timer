'use strict';
var app = angular.module('bloodrageBattleTimer', [
    // Angular Module Dependency
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'btford.socket-io',

    // Custom Services
    'core',

    // Route Components
    'indexMain',
    'aboutMain',

    // Modal Components
]);



app.run(['$rootScope', '$window', '$document',
function($rootScope, $window, $document){
    
    // Window resize Event
    $window.addEventListener('resize',function(event){
        clearTimeout($window.resizedFinished);
        $window.resizedFinished = setTimeout(function(){
            $rootScope.$apply();
        }, 250);
    });

    // Window Scroll Event
    $window.addEventListener('scroll',function(event){
        clearTimeout($window.scrollFinished);
        $window.scrollFinished = setTimeout(function(){
            var scrollHeight = $window.pageYOffset + $window.innerHeight;
            var documentHeight = $document.height();
            if(scrollHeight >= documentHeight - 100) {
                $rootScope.$broadcast('scrollend', event);
            }
            $rootScope.$apply();
        }, 250);
    });

}]);

app.controller('indexController', [
    '$scope',
    'api',
    'preferences',
    'socket',
    function ($scope, api, preferences, socket) {
        $scope.username = 'USER NAME'

        socket.on('isShowNameWorked', function(data){
            $scope.username = data;
        });

        socket.emit('showNameData', 'Prelude..');
}]);