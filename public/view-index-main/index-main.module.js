'use strict';

angular.module('indexMain', [
    'core',
]);
angular.module('indexMain').
component('indexMain', {
    templateUrl: 'view-index-main/index-main.template.html',
    controller: ['$scope', 'api', 'preferences',
        function indexMainController($scope, api, preferences) {
            var ctrl = this;

        } // Here is end of the Controller.
    ]
});