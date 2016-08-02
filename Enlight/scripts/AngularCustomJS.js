var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate']);

AngularCustomJS.controller('homeController', homeController);

AngularCustomJS.factory('homeFactory', homeFactory);

var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/',
            controller: homeController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);