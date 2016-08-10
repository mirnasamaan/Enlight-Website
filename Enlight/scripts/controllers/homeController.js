﻿var homeController = function ($scope, $sce, $routeParams, homeFactory, contactFactory) {

    $scope.addWidgetForm = {
        name: '',
        email: '',
        number: '',
        message: '',
        returnUrl: $routeParams.returnUrl
    };

    homeFactory.getHomeContent()
      .then(function (data) {
          $scope.homeContent = data;
          return homeFactory.getClientContent()
      })
      .then(function (data) {
          $scope.clientContent = data;
          return homeFactory.getClientContent()
      })
     .then(function () {
         $('.flexslider').flexslider({
             animation: "slide",
             animationLoop: false,
             itemWidth: 244,
             itemMargin: 40,
             minItems: 2,
             maxItems: 4
         });
     });
          
    
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.validationOptions = {
        ignore: [],
        rules: {
            name: "required",
            email: "required",
            number: "required",
            message: "required"
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    }

    $scope.add = function (form) {
        if (form.validate()) {
            $scope.submitContact = function () {
                var result = contactFactory($scope.addWidgetForm.name, $scope.addWidgetForm.email, $scope.addWidgetForm.number, $scope.addWidgetForm.message);
                return result;
            }
           .then(function (data) {
               
           })
            
        }
    } 

    function changeNavHoverColor(e, code) {
        $(e).children("a").css("color", code);
    }

    $(document).ready(function () {
        //---------- Navigation links hover effect ----------//
        $(".navbar-nav > li").mouseover(function () {
            setTimeout(changeNavHoverColor($(this), "#134b6c"), 20);
            $(this).children(".overlay").animate({
                height: "100%"
            }, 300, function () { });
        });
        $(".navbar-nav > li").mouseleave(function () {
            $(this).children(".overlay").animate({
                height: "50%"
            }, 150, function () {
                $(this).parent().children("a").css("color", "#fff");
                $(this).parent().children(".overlay").animate({
                    height: "0"
                }, 150, function () { });
            });
        });

        //--------- Gatting and setting sections height according to screen size ----------//
        $(".banner").css("height", $(window).height());
        var main_banner_height = $(".banner").height();
        sticky_header_height = $(".sticky").height();
        var counted = false;

        //---------- change top banner height when resizing the window ----------//
        $(window).resize(function () {
            $(".banner").css("height", $(window).height());
            main_banner_height = $(".banner").height();
            sticky_header_height = $(".sticky").height();
        })

        //---------- Scroll to content of page when clicking on the down arrow in the homepage slider -----------//
        $('.down-arrow').click(function () {
            var offset = 0;
            if ($(window).width() > 768) {
                offset = - sticky_header_height - $(".main-header").height() - $(".main-header").height() - 20;
            } else {
                offset = - sticky_header_height;
            }
            $('body,html').animate({
                scrollTop: $('#page-content').offset().top + offset
            }, 1000);
            return false;
        });

        $(window).scroll(function () {
            //---------- Switching between main and sticky headers according to the window's scroll value ----------//
            if ($(this).scrollTop() > main_banner_height - sticky_header_height - 10) {
                $(".sticky").fadeIn("fast");
            }
            else {
                $(".sticky").fadeOut("fast");
            }
        });
    });

    var counted = false;
    $(document).ready(function () {
        $('select').bselect();
        $('.flexslider').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 244,
            itemMargin: 40,
            minItems: 2,
            maxItems: 4
        });
    });

    //---------- Title text animation----------//
    var animated = [false, false, false, false, false];
    function animateTitle(div_id, array_index) {
        $('#' + div_id).children('div').children('.title').children('div').children('div:first-child').children('div').animate({
            height: "50"
        }, 500, function () {
            // Animation complete.
            if (animated[array_index] == false) {
                var str = $('#' + div_id).children('div').children('.title').children('div').children('.tit-div').text();
                $('#' + div_id).children('div').children('.title').children('div').children('.tit-div').css('visibility', 'visible');
                $('#' + div_id).children('div').children('.title').children('div').children('.tit-div').lbyl({
                    content: str,
                    speed: 20, //time between each new letter being added
                    //type: 'fade', // 'show' or 'fade'
                    //fadeSpeed: 1000, // Only relevant when the 'type' is set to 'fade'
                    finished: function () {
                        if ($('#' + div_id).children('div').children('.title').children('div').children('.subtitle').length > 0) {
                            str = $('#' + div_id).children('div').children('.title').children('div').children('.subtitle').text();
                            $('#' + div_id).children('div').children('.title').children('div').children('.subtitle').css('visibility', 'visible');
                            $('#' + div_id).children('div').children('.title').children('div').children('.subtitle').lbyl({
                                content: str,
                                speed: 10, //time between each new letter being added
                                //type: 'fade', // 'show' or 'fade'
                                //fadeSpeed: 500, // Only relevant when the 'type' is set to 'fade'
                                finished: function () {
                                    $('#' + div_id).children('div').children('.title').children('div').children('div:last-child').children('div').animate({
                                        height: "50"
                                    }, 500, function () { });
                                }
                            });
                        } else {
                            $('#' + div_id).children('div').children('.title').children('div').children('div:last-child').children('div').animate({
                                height: "50"
                            }, 500, function () { });
                        }
                    } // Finished Callback
                });
                animated[array_index] = true;
            }
        });
    }

    $(window).scroll(function () {
        //---------- Counter numbers animation ---------->
        if ($('.stats').visible() && counted == false) {
            counted = true;
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
            $(".counter span").each(function (index) {
                $(this).animateNumber({
                    number: $(this).text(),
                    numberStep: comma_separator_number_step
                });
            }, 30000);
        }

        //---------- Add active class when scrolling over divs ----------//
        if ($('#contact').visible(true)) {
            $('.nav > li').removeClass("active");
            $('#contact-link').addClass("active");
            if (animated[4] == false) {
                animateTitle('contact', 4)
            }
        } else if ($('#team').visible(true)) {
            $('.nav > li').removeClass("active");
            $('#team-link').addClass("active");
            if (animated[3] == false) {
                animateTitle('team', 3)
            }
        } else if ($('#clients').visible(true)) {
            $('.nav > li').removeClass("active");
            $('#clients-link').addClass("active");
            if (animated[2] == false) {
                animateTitle('clients', 2)
            }
        } else if ($('#stream').visible(true)) {
            $('.nav > li').removeClass("active");
            $('#stream-link').addClass("active");
            if (animated[1] == false) {
                animateTitle('stream', 1)
            }
        } else if ($('#services').visible(true)) {
            $('.nav > li').removeClass("active");
            $('#services-link').addClass("active");
            if (animated[0] == false) {
                animateTitle('services', 0)
            }
        } else if ($('.banner').visible()) {
            $('.nav > li').removeClass("active");
        }
    });
}

homeController.$inject = ['$scope', '$sce', '$routeParams', 'homeFactory', 'contactFactory'];