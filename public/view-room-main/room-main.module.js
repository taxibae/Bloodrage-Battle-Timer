'use strict';

angular.module('roomMain', [
    'core',
    'ngCookies',
])
.component('roomMain', {
    templateUrl: 'view-room-main/room-main.template.html',
    controller: [
        '$scope',
        '$cookies',
        'api',
        'preferences',
        'socket',
        function roomMainController($scope, $cookies, api, preferences, socket) {
            var ctrl = this;

            ctrl.roomdata = preferences.roomdata;
            $scope.$on('joinroomExec', function(event, data){
                console.log('joinroomExec by other user.');
                ctrl.roomdata = preferences.roomdata;
            });

            // var data = {
            //     player: ctrl.player_number,
            //     title: ctrl.room_name,
            //     passwd: ctrl.passwd,
            //     gametype: ctrl.game_type
            // };

        } // Here is end of the Controller.
    ]
});