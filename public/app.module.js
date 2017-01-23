'use strict';
var app = angular.module('bloodrageBattleTimer', [
    // Angular Module Dependency
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ui.bootstrap',
    'btford.socket-io',

    // Custom Services
    'core',

    // Route Components
    'indexMain',
    'aboutMain',

    // Modal Components
    'makeroomModal'
]);



app.run(['$rootScope', '$window', '$document', '$cookies', 'preferences',
function($rootScope, $window, $document, $cookies, preferences){
    
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
    // Userdata Initilize
    preferences.userdata.name = $cookies.get('username') || 'USER NAME';
    console.log(preferences.userdata.name);

}]);

app.controller('indexController', [
    '$scope',
    'api',
    'preferences',
    'socket',
    function ($scope, api, preferences, socket, $uibModal) {
        
        /* Socket init */
        (function (socketinstance, actionName) {
            socketinstance.on('isShowNameWorked', function (data) {
                $scope.username = data;
            });
            socketinstance.on('connectio', function (data) {
                $scope.username = data;
            });
            socket[actionName] = {
                setUser: function () {
                    socketinstance.emit('setuser', {
                        username: preferences.userdata.name
                    });
                },
                makeRoom: function (room) {
                    socketinstance.emit('makeroom', {
                        username: preferences.userdata.name,
                        title: room.title,
                        gametype: room.gametype,
                        player: room.player
                    });
                },
                joinRoom: function () {
                    socketinstance.emit('joinroom', {
                        username: preferences.userdata.name,
                        roomid: '',
                    });
                },
                getRooms: function () {
                    socketinstance.emit('getroom');
                }
            };
        })(socket, 'userAction');

        // Socket User Initilize
        socket.userAction.setUser();
    }
]);