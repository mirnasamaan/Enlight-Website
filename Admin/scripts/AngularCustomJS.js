var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate', 'datatables']);

AngularCustomJS.controller('widgetController', widgetController);
AngularCustomJS.controller('widgetDetailsController', widgetDetailsController);
AngularCustomJS.controller('widgetDeleteController', widgetDeleteController);
AngularCustomJS.controller('widgetEditController', widgetEditController);
AngularCustomJS.controller('ServerSideProcessingCtrl', ServerSideProcessingCtrl);
AngularCustomJS.controller('userAddController', userAddController);
AngularCustomJS.controller('userListController', userListController);
AngularCustomJS.controller('userDetailsController', userDetailsController);
AngularCustomJS.controller('userDeleteController', userDeleteController);
AngularCustomJS.controller('userEditController', userEditController);

AngularCustomJS.factory('widgetFactory', widgetFactory);
AngularCustomJS.factory('widgetDetailsFactory', widgetDetailsFactory);
AngularCustomJS.factory('widgetEditFactory', widgetEditFactory);
AngularCustomJS.factory('userAddFactory', userAddFactory);
AngularCustomJS.factory('userDetailsFactory', userDetailsFactory);
AngularCustomJS.factory('userEditFactory', userEditFactory);

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
        }).
        when('/User/Add', {
            templateUrl: '/User/Add',
            controller: userAddController
        }).
        when('/User/List', {
            templateUrl: '/User/List',
            controller: userListController
        }).
        when('/User/Details/:id', {
            templateUrl: '/User/Details',
            controller: userDetailsController
        }).
        when('/User/Delete/:id', {
            templateUrl: '/User/Delete',
            controller: userDeleteController
        }).
        when('/User/Edit/:id', {
            templateUrl: '/User/Edit',
            controller: userEditController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);