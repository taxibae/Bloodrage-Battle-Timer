angular.module('core.preferences',[])
.factory('preferences', [
    function() {
        var option = {
            API_VERSION : '0.1'
        }
        var userdata = {
            id: '',
            name: ''
        }
        var roomdata = {};

        return {
            option: option,
            userdata: userdata,
            roomdata: roomdata
        }
    }
]);