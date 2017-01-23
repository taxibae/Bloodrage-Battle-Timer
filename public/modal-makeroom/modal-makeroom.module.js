'use strict';
angular.module('makeroomModal', [
    // UI module
])
.component('makeroomModal', {
    templateUrl: 'modal-makeroom/modal-makeroom.template.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: [
        '$scope',
        'api',
        'preferences',
        'socket',
        function ($scope, api, preferences, socket) {
            var ctrl = this;
            ctrl.player_number = 1;
            ctrl.room_name;
            ctrl.passwd;

            ctrl.ok = function () {
                ctrl.close({
                    $value: 'OkClick'
                });
            };
            ctrl.cancel = function () {
                ctrl.dismiss({
                    $value: 'cancel'
                });
            };
            ctrl.arrowClicked = function(direction){
                if(direction === 'left'){
                    if (ctrl.player_number <= 1) {
                        ctrl.player_number = 1
                    } else {
                        ctrl.player_number = ctrl.player_number - 1;
                    }
                }
                if(direction === 'right'){
                    if (ctrl.player_number >= 4) {
                        ctrl.player_number = 4
                    } else {
                        ctrl.player_number = ctrl.player_number + 1;
                    }
                }
            }
        }
    ]
});