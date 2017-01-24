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

        } // Here is end of the Controller.
    ]
});