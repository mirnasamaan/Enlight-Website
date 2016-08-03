var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate', 'datatables']);

AngularCustomJS.controller('widgetController', widgetController);
AngularCustomJS.controller('widgetDetailsController', widgetDetailsController);
AngularCustomJS.controller('widgetDeleteController', widgetDeleteController);
AngularCustomJS.controller('widgetEditController', widgetEditController);
AngularCustomJS.controller('ServerSideProcessingCtrl', ServerSideProcessingCtrl);

AngularCustomJS.factory('widgetFactory', widgetFactory);
AngularCustomJS.factory('widgetDetailsFactory', widgetDetailsFactory);
AngularCustomJS.factory('widgetEditFactory', widgetEditFactory);

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
        }).
        when('/Widget/Delete/:id', {
            templateUrl: '/Widget/Delete',
            controller: widgetDeleteController
        }).
        when('/Widget/Edit/:id', {
            templateUrl: '/Widget/Edit',
            controller: widgetEditController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);