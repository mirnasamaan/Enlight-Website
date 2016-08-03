var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate', 'ngSanitize']);

AngularCustomJS.controller('homeController', homeController);

AngularCustomJS.factory('homeFactory', homeFactory);

var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/Home/Main',
            controller: homeController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);