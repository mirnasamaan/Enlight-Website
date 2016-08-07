var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate', 'datatables', 'ngFileUpload']);

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
AngularCustomJS.controller('clientAddController', clientAddController);
AngularCustomJS.controller('clientListController', clientListController);
AngularCustomJS.controller('clientDetailsController', clientDetailsController);
AngularCustomJS.controller('clientDeleteController', clientDeleteController);
AngularCustomJS.controller('clientEditController', clientEditController);
AngularCustomJS.controller('contactDetailsController', contactDetailsController);
AngularCustomJS.controller('contactDeleteController', contactDeleteController);
AngularCustomJS.controller('quoteDetailsController', quoteDetailsController);
AngularCustomJS.controller('quoteDeleteController', quoteDeleteController);

AngularCustomJS.factory('widgetFactory', widgetFactory);
AngularCustomJS.factory('widgetDetailsFactory', widgetDetailsFactory);
AngularCustomJS.factory('widgetEditFactory', widgetEditFactory);
AngularCustomJS.factory('userAddFactory', userAddFactory);
AngularCustomJS.factory('userDetailsFactory', userDetailsFactory);
AngularCustomJS.factory('userEditFactory', userEditFactory);
AngularCustomJS.factory('clientAddFactory', clientAddFactory);
AngularCustomJS.factory('clientDetailsFactory', clientDetailsFactory);
AngularCustomJS.factory('clientEditFactory', clientEditFactory);
AngularCustomJS.factory('contactDetailsFactory', contactDetailsFactory);
AngularCustomJS.factory('quoteDetailsFactory', quoteDetailsFactory);

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
        }).
        when('/Client/Add', {
            templateUrl: '/Client/Add',
            controller: clientAddController
        }).
        when('/Client/List', {
            templateUrl: '/Client/List',
            controller: clientListController
        }).
        when('/Client/Details/:id', {
            templateUrl: '/Client/Details',
            controller: clientDetailsController
        }).
        when('/Client/Delete/:id', {
            templateUrl: '/Client/Delete',
            controller: clientDeleteController
        }).
        when('/Client/Edit/:id', {
            templateUrl: '/Client/Edit',
            controller: clientEditController
        }).
        when('/Contact/List', {
            templateUrl: '/Contact/List',
            controller: contactListController
        }).
        when('/Contact/Details/:id', {
            templateUrl: '/Contact/Details',
            controller: contactDetailsController
        }).
        when('/Contact/Delete/:id', {
            templateUrl: '/Contact/Delete',
            controller: contactDeleteController
        }).
        when('/Quote/List', {
            templateUrl: '/Quote/List',
            controller: quoteListController
        }).
        when('/Quote/Details/:id', {
            templateUrl: '/Quote/Details',
            controller: quoteDetailsController
        }).
        when('/Quote/Delete/:id', {
            templateUrl: '/Quote/Delete',
            controller: quoteDeleteController
        });
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);