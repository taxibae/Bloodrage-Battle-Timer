'use strict';

angular.module('roomGame', [
    'core',
    'ngCookies',
])
.component('roomGame', {
    templateUrl: 'view-room-game/room-game.template.html',
    controller: [
        '$scope',
        '$cookies',
        '$uibModal',
        'api',
        'preferences',
        'socket',
        function roomGameController($scope, $cookies, $uibModal, api, preferences, socket) {
            var ctrl = this;

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