var homeController = function ($scope, $sce, $routeParams, homeFactory, contactFactory) {

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

    
    $(document).ready(function () {
        //--------- Gatting and setting sections height according to screen size ----------//
        $(".banner").css("height", $(window).height());
        var main_banner_height = $(".banner").height();
        sticky_header_height = $(".sticky").height();
        var counted = false;

        //---------- change top banne height when resizing the window ----------//
        $(window).resize(function () {
            $(".banner").css("height", $(window).height());
            main_banner_height = $(".banner").height();
            sticky_header_height = $(".sticky").height();
        })

        //---------- Scroll to content of page when clicking on the down arrow in the homepage slider -----------//
        $('.down-arrow').click(function () {
            $('body,html').animate({
                scrollTop: $('#page-content').offset().top + (-sticky_header_height)
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
        if ($('#services').visible()) {
            $('.nav > li').removeClass("active");
            $('#services-link').addClass("active");
        } else if ($('#stream').visible()) {
            $('.nav > li').removeClass("active");
            $('#stream-link').addClass("active");
        } else if ($('#clients').visible()) {
            $('.nav > li').removeClass("active");
            $('#clients-link').addClass("active");
        } else if ($('#team').visible()) {
            $('.nav > li').removeClass("active");
            $('#team-link').addClass("active");
        } else if ($('#contact').visible()) {
            $('.nav > li').removeClass("active");
            $('#contact-link').addClass("active");
        } else if ($('.banner').visible()) {
            $('.nav > li').removeClass("active");
        }
    });

    $(document)
	.one('focus.textarea', '.autoExpand', function () {
	    var savedValue = this.value;
	    this.value = '';
	    this.baseScrollHeight = this.scrollHeight;
	    this.value = savedValue;
	})
	.on('input.textarea', '.autoExpand', function () {
	    var minRows = this.getAttribute('data-min-rows') | 0, rows;
	    this.rows = minRows;
	    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
	    this.rows = minRows + rows;
	});

}

homeController.$inject = ['$scope', '$sce', '$routeParams', 'homeFactory', 'contactFactory'];