angular.module('core.preferences',[])
.factory('preferences', [
    function() {
        var option = {
            API_VERSION : '0.1'
        }

        return {
            option: option
        }
    }
]);