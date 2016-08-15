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

    //var touch = window.ontouchstart
    //        || (navigator.MaxTouchPoints > 0)
    //        || (navigator.msMaxTouchPoints > 0);

    //if (touch) { // remove all :hover stylesheets
    //    try { // prevent exception on browsers not supporting DOM styleSheets properly
    //        for (var si in document.styleSheets) {
    //            var styleSheet = document.styleSheets[si];
    //            if (!styleSheet.rules) continue;

    //            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
    //                if (!styleSheet.rules[ri].selectorText) continue;

    //                if (styleSheet.rules[ri].selectorText.match(':hover')) {
    //                    styleSheet.deleteRule(ri);
    //                }
    //            }
    //        }
    //    } catch (ex) { }
    //}

    var sticky_header_height = $(".sticky").height();

    $scope.home = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#home-link").addClass("active");
        if ($(".sticky .navbar-collapse").hasClass("in")) {
            $("#sticky-btn").trigger("click");
        }
        if ($(".main-header .navbar-collapse").hasClass("in")) {
            $("#main-btn").trigger("click");
        }
        return false;
    }

    $scope.services = function (e) {
        $('body,html').animate({
            scrollTop: $('.services').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#services-link").addClass("active");
        if ($(".sticky .navbar-collapse").hasClass("in")) {
            $("#sticky-btn").trigger("click");
        }
        if ($(".main-header .navbar-collapse").hasClass("in")) {
            $("#main-btn").trigger("click");
        }
        return false;
    }

    $scope.stream = function () {
        $('body,html').animate({
            scrollTop: $('#stream').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#stream-link").addClass("active");
        if ($(".sticky .navbar-collapse").hasClass("in")) {
            $("#sticky-btn").trigger("click");
        }
        if ($(".main-header .navbar-collapse").hasClass("in")) {
            $("#main-btn").trigger("click");
        }
        return false;
    }

    $scope.clients = function () {
        $('body,html').animate({
            scrollTop: $('#clients').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#clients-link").addClass("active");
        if ($(".sticky .navbar-collapse").hasClass("in")) {
            $("#sticky-btn").trigger("click");
        }
        if ($(".main-header .navbar-collapse").hasClass("in")) {
            $("#main-btn").trigger("click");
        }
        return false;
    }

    $scope.team = function () {
        $('body,html').animate({
            scrollTop: $('#team').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#team-link").addClass("active");
        if ($(".sticky .navbar-collapse").hasClass("in")) {
            $("#sticky-btn").trigger("click");
        }
        if ($(".main-header .navbar-collapse").hasClass("in")) {
            $("#main-btn").trigger("click");
        }
        return false;
    }

    $scope.contact = function () {
        $('body,html').animate({
            scrollTop: $('#contact').offset().top + (-sticky_header_height)
        }, 1000);
        $('.nav > li').removeClass("active");
        $("#contact-link").addClass("active");
        if ($(".sticky .navbar-collapse").hasClass("in")) {
            $("#sticky-btn").trigger("click");
        }
        if ($(".main-header .navbar-collapse").hasClass("in")) {
            $("#main-btn").trigger("click");
        }
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