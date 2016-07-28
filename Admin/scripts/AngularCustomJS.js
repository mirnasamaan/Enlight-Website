var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate']);

AngularCustomJS.controller('widgetController', widgetController);

AngularCustomJS.factory('widgetFactory', widgetFactory);

var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/Widget/Add', {
            templateUrl: '/Widget/Add',
            controller: widgetController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);