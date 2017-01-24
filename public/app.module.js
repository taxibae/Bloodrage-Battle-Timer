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
    'roomMain',

    // Modal Components
    'makeroomModal'
])
.run(['$rootScope', '$window', '$document', '$cookies', 'preferences',
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

}])
.config(['$locationProvider' ,'$routeProvider',
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
        when('/room/:roomId', {
            template: '<room-main></room-main>'
        }).
        otherwise('/');
    }
])
.controller('indexController', [
    '$rootScope',
    '$scope',
    '$window',
    'api',
    'preferences',
    'socket',
    function ($rootScope, $scope, $window, api, preferences, socket, $uibModal) {
        
        /* Socket init */
        (function (socketinstance, actionName) {
            socketinstance.on('error', function (data) {
                console.log(data);
            });
            socketinstance.on('getroomExec', function (data) {
                console.log(data);
                $rootScope.$broadcast('getroomExec', data);
            });
            socket[actionName] = {
                setUser: function () {
                    socketinstance.emit('setuser', {
                        username: preferences.userdata.name
                    });
                },
                disconnect: function(){
                    socketinstance.emit('disconnectuser');
                },
                makeRoom: function (room) {
                    console.log('makeRoom Fired.')
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

        // root event initilize
        $window.onbeforeunload = function(){
            socket.userAction.disconnect();
        }

        // click event 
        $scope.disconnectClicked = function(){
            socket.userAction.disconnect();
            console.log('force disconnect');
        }
    }
]);