﻿var homeController = function ($q, $scope, $sce, $routeParams, homeFactory, contactFactory, quoteFactory) {

    $scope.addWidgetForm = {
        name: '',
        email: '',
        number: '',
        message: '',
        returnUrl: $routeParams.returnUrl
    };

    $scope.addQuoteForm = {
        name: '',
        email: '',
        phone: '',
        category: '',
        type: '',
        message: '',
        recommend: '',
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

    //$validatorProvider.addMethod("valueNotEquals", function (value, element, arg) {
    //    return arg != value;
    //}),

    $scope.validationOptionsSubmit = {
        //ignore: [],
        rules: {
            name: "required",
            email: "required",
            phone: "required",
            category: {
                required: true,
                number: true,
            },
            type: {
                required: true,
                number: true,
            },
            message: "required",
            recommend: {
                required: true,
                number: true,
            }
        },
        messages: {
            category: {
                number: "This field is required"
            },
            type: {
                number: "This field is required"
            },
            recommend: {
                number: "This field is required"
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "category" || element.attr("name") == "type" || element.attr("name") == "recommend") {
                error.insertAfter(element.parent().children(".bselect"));
            } else {
                error.insertAfter(element);
            }
        }
    }

    $scope.add = function (form) {
        if (form.validate()) {
            var result = contactFactory($scope.addWidgetForm.name, $scope.addWidgetForm.email, $scope.addWidgetForm.number, $scope.addWidgetForm.message);
            result.then(function (data) {
                if (data.success == true)
                {
                    $scope.err_msg = "Form was submitted successfully"
                }
                else
                {
                    $scope.err_msg = "Something went wrong...Please try again"
                }
            });
        }
    }

    $scope.submit = function (form) {
        
        if (form.validate()) {
            $scope.addQuoteForm.category = $scope.category;
            $scope.addQuoteForm.type = $scope.type;
            $scope.addQuoteForm.recommend = $scope.recommend;
            var result = quoteFactory($scope.addQuoteForm.name, $scope.addQuoteForm.email, $scope.addQuoteForm.phone, $scope.addQuoteForm.category, $scope.addQuoteForm.type, $scope.addQuoteForm.message, $scope.addQuoteForm.recommend);
            result.then(function (data) {
                if (data.success == true) {
                    $scope.err_msg = "Form was submitted successfully"
                }
                else {
                    $scope.err_msg = "Something went wrong...Please try again"
                }
            });
        }
    }


    function changeNavHoverColor(e, code) {
        $(e).children("a").css("color", code);
    }

    $(document).ready(function () {
        //---------- Change type dropdown according to category dropdown ----------//
        $("#category").change(function () {
            $("#type").bselect("destroy");
            if ($(this).val() == "1") {
                $("#type").html("");
                $("#type").append('<option value="1">DESIGN</option><option value="2">FRONTEND DEVELOPMENT</option><option value="3">BACKEND DEVELOPMENT</option><option value="4">ALL OF THE ABOVE</option>');
                $('#type').bselect();
            } else if ($(this).val() == "2") {
                $("#type").html("");
                $("#type").append('<option value="1">DESIGN</option><option value="2">IOS DEVELOPMENT</option><option value="3">ANDROID DEVELOPMENT</option><option value="4">ALL OF THE ABOVE</option>');
                $('#type').bselect();
            } else {
                $("#type").html("");
                $("#type").append('<option>CHOOSE A TYPE</option>');
                $('#type').bselect();
            }
            initializeSelectEvent();
        })

        //---------- Getting and setting sections height according to screen size ----------//
        $(".banner").css("height", $(window).height());
        var main_banner_height = $(".banner").height();
        sticky_header_height = $(".sticky").height();
        var counted = false;

        //---------- change top banner height when resizing the window ----------//
        $(window).resize(function () {
            $("#stream .content > div").css("width", $(window).width() + "px");
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
        $(".bselect a").removeAttr('href');
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

    function initializeSelectEvent() {
        $('.bselect a').click(function (e) {
            e.preventDefault();
            var x = ($(event.target).text());
            if (x == "WEBSITE DEVELOPMENT" || x == "MOBILE DEVELOPMENT") {
                $scope.category = x;
                //$("#category").val(x);
            }
            if (x == "DESIGN" || x == "FRONTEND DEVELOPMENT" || x == "BACKEND DEVELOPMENT" || x == "ALL OF THE ABOVE" || x == "IOS DEVELOPMENT" || x == "ANDROID DEVELOPMENT") {
                $scope.type = x;
            }
            if (x == "RECOMMENDATION" || x == "LINKEDIN" || x == "FACEBOOK" || x == "GOOGLE SEARCH" || x == "PREVIOUS WORK") {
                $scope.recommend = x;
            }
        });
    };

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
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
            $(".counter .val").each(function (index) {
                $(this).animateNumber({
                    number: $(this).parent().children("input").val(),
                    numberStep: comma_separator_number_step
                });
            }, 30000);
        }

        //---------- Add active class when scrolling over divs ----------//
        if ($('#contact').visible(true)) {
            //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //    $("#contact form input").focus(function () {
            //        $(window).scrollTop($(this).offset().top - $(".sticky").outerHeight());
            //    });
            //}
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
                $.when(animateTitle('stream', 1)).done(function () {
                    //---------- Progressbar animation ----------//
                    $("#stream .content > div").css("width", $(window).width() + "px");
                    $("#stream .content").animate({
                        "width": "100%"
                    }, 5000);
                });
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

homeController.$inject = ['$q', '$scope', '$sce', '$routeParams', 'homeFactory', 'contactFactory', 'quoteFactory'];
