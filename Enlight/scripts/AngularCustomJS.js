var AngularCustomJS = angular.module('AngularCustomJS', ['ngRoute', 'ngValidate', 'ngSanitize', 'angular-bind-html-compile']);

//AngularCustomJS.config(function ($validatorProvider) {
//    $validatorProvider.addMethod("valueNotEquals", function (value, element, arg) {
//        return arg != value;
//    }, "This field is required.");
//    });

AngularCustomJS.controller('homeController', homeController);
AngularCustomJS.factory('contactFactory', contactFactory);
AngularCustomJS.factory('quoteFactory', quoteFactory);

AngularCustomJS.controller('mainCtrl', [ '$scope',function ($scope) {

    var sticky_header_height = $(".sticky").height();;

    $scope.home = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#home-link").addClass("active");
        return false;
    }

    $scope.services = function (e) {
        $('body,html').animate({
            scrollTop: $('.services').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#services-link").addClass("active");
        return false;
    }

    $scope.stream = function () {
        $('body,html').animate({
            scrollTop: $('#stream').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#stream-link").addClass("active");
        return false;
    }

    $scope.clients = function () {
        $('body,html').animate({
            scrollTop: $('#clients').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#clients-link").addClass("active");
        return false;
    }

    $scope.team = function () {
        $('body,html').animate({
            scrollTop: $('#team').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#team-link").addClass("active");
        return false;
    }

    $scope.contact = function () {
        $('body,html').animate({
            scrollTop: $('#contact').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#contact-link").addClass("active");
        return false;
    }

}]);

AngularCustomJS.factory('homeFactory', homeFactory);

var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/Home/Main',
            controller: homeController
        });
    //$validatorProvider.addMethod("valueNotEquals", function (value, element, arg) {
    //    return arg != value;
    //}, "This field is required.");
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

AngularCustomJS.config(configFunction);