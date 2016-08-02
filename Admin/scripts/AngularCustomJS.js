var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate', 'datatables']);

AngularCustomJS.controller('widgetController', widgetController);
AngularCustomJS.controller('widgetDetailsController', widgetDetailsController);
AngularCustomJS.controller('ServerSideProcessingCtrl', ServerSideProcessingCtrl);

AngularCustomJS.factory('widgetFactory', widgetFactory);
AngularCustomJS.factory('widgetDetailsFactory', widgetDetailsFactory);

var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/Widget/Add', {
            templateUrl: '/Widget/Add',
            controller: widgetController
        }).
        when('/Widget/List', {
            templateUrl: '/Widget/List',
            controller: ServerSideProcessingCtrl
        }).
        when('/Widget/Details/:id', {
            templateUrl: '/Widget/Details',
            controller: widgetDetailsController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);