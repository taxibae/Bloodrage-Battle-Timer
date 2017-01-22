'use strict';

angular.module('indexMain', [
    'core',
    'ngCookies'
]);
angular.module('indexMain').
component('indexMain', {
    templateUrl: 'view-index-main/index-main.template.html',
    controller: [
        '$scope',
        '$cookies',
        'api',
        'preferences',
        function indexMainController($scope, $cookies, api, preferences) {
            var ctrl = this;
            ctrl.username = preferences.userdata.name;

            ctrl.changeName = function(){
                console.log('changeName');
                preferences.userdata.name = ctrl.username;
                $cookies.put('username', ctrl.username);
            }
        } // Here is end of the Controller.
    ]
});