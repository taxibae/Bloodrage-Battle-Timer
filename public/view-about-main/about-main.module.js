'use strict';

angular.module('aboutMain', [
    'core',
]).
component('aboutMain', {
    templateUrl: 'view-about-main/about-main.template.html',
    controller: ['$scope', 'api', 'preferences',
        function aboutMainController($scope, api, preferences) {
            var ctrl = this;

        } // Here is end of the Controller.
    ]
});