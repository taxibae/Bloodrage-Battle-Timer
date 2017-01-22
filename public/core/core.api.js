angular.module('core.api',[
    'core.preferences',
    'ngResource',
])
.factory('api', [
    '$resource',
    'preferences',
    function($resource, preferences) {
        var testApi = $resource('/api/'+ preferences.option.API_VERSION + '/', {},
        {
            sendMessage: {
                method : 'GET'
            }
        });

        return{
            testApi: testApi
        }
    }
]);