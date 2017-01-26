'use strict';

angular.module('indexMain', [
    'core',
    'ngCookies',
    'ngRoute',
]);
angular.module('indexMain').
component('indexMain', {
    templateUrl: 'view-index-main/index-main.template.html',
    controller: [
        '$scope',
        '$cookies',
        '$uibModal',
        '$location',
        'api',
        'preferences',
        'socket',
        function indexMainController($scope, $cookies, $uibModal, $location, api, preferences, socket) {
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
                console.log('getroom event exec');
                ctrl.roomdata = data;
            });
            $scope.$on('makeroomExec', function(event, data){
                console.log('makeroom event exec');
                $location.path('/room/' + data.roomid)
            });
            $scope.$on('joinroomExec', function(event, data){
                console.log('joinroom event exec');
                $location.path('/room/' + data.roomid);
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
                socket.userAction.setUser();
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
            ctrl.joinroomClicked = function(id){
                socket.userAction.setUser();
                socket.userAction.joinRoom(id);
            }

            // Loding
            socket.userAction.getRooms();

        } // Here is end of the Controller.
    ]
});