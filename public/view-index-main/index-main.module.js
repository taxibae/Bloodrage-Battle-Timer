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
            ctrl.username = preferences.userdata.name;
            ctrl.roomdata = {};

            $scope.doBlur = function ($event) {
                if ($event.key == 'Enter') {
                    $event.target.blur();
                }
            }
            $scope.$on('getroomExec', function(event, data){
                console.log('event exec');
                ctrl.roomdata = data;
            });

            ctrl.changeName = function () {
                console.log('changeName');
                preferences.userdata.name = ctrl.username;
                $cookies.put('username', ctrl.username);
                socket.userAction.setUser();
            }

            ctrl.refreshClicked = function() {
                socket.userAction.getRooms();
            }

            ctrl.makeroomClicked = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    component: 'makeroomModal',
                });
                modalInstance.result.then(function (data) {
                    console.log(data);
                    socket.userAction.makeRoom(data);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            // Loding
            socket.userAction.getRooms();

        } // Here is end of the Controller.
    ]
});