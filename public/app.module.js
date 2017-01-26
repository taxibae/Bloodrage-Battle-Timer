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
    'roomGame',

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
        when('/room/:roomId/play', {
            template: '<room-game></room-game>'
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
            // Exec interaction
            socketinstance.on('errorOccured', function (data) {
                console.log('data of errorOccured');
                console.log(data);
            });
            socketinstance.on('getroomExec', function (data) {
                console.log('data of errorOccured');
                console.log(data);
                $rootScope.$broadcast('getroomExec', data);
            });
            socketinstance.on('makeroomExec', function (data) {
                console.log('data of getroomExec');
                console.log(data);
                preferences.roomdata = data;
                $rootScope.$broadcast('makeroomExec', data);
            });
            socketinstance.on('joinroomExec', function (data) {
                console.log('data of joinroomExec');
                console.log(data);
                preferences.roomdata = data;
                $rootScope.$broadcast('joinroomExec', data);
            });

            // Status interaction
            
            socket[actionName] = {
                setUser: function () {
                    console.log('setUser Fired.');
                    socketinstance.emit('setuser', {
                        username: preferences.userdata.name
                    });
                },
                disconnect: function(){
                    console.log('disconnect Fired.');
                    socketinstance.emit('disconnectuser');
                },
                makeRoom: function (room) {
                    console.log('makeRoom Fired.');
                    socketinstance.emit('makeroom', {
                        username: preferences.userdata.name,
                        title: room.title,
                        gametype: room.gametype,
                        player: room.player
                    });
                },
                joinRoom: function (id) {
                    console.log('joinRoom Fired.');
                    socketinstance.emit('joinroom', {
                        username: preferences.userdata.name,
                        roomid: id,
                    });
                },
                getRooms: function () {
                    console.log('getRooms Fired.');
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