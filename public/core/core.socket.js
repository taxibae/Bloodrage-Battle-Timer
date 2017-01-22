angular.module('core.socket',[
    'core.preferences',
    'btford.socket-io'
])
.factory('socket', [
    'socketFactory',
    function(socketFactory) {
        return socketFactory();
    }
]);
