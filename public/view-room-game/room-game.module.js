'use strict';

angular.module('indexMain', [
    'core',
    'ngCookies',
]);
angular.module('indexMain').
component('indexMain', {
    templateUrl: 'view-index-main/index-main.template.html',
    controller: [
        '$scope',
        '$cookies',
        '$uibModal',
        'api',
        'preferences',
        'socket',
        function indexMainController($scope, $cookies, $uibModal, api, preferences, socket) {
            var ctrl = this;
            // Scope Event
            $scope.doBlur = function ($event) {
                if($event.key == 'Enter') {
                    $event.target.blur();
                }
            }
            ctrl.username = preferences.userdata.name;

            ctrl.changeName = function(){
                console.log('changeName');
                preferences.userdata.name = ctrl.username;
                $cookies.put('username', ctrl.username);
                socket.userAction.setUser();
            }

            ctrl.makeroomClicked = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    component: 'makeroomModal',
                });
            };

        } // Here is end of the Controller.
    ]
});