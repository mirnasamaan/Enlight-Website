var widgetController = function ($scope, $routeParams, widgetFactory) {
    $scope.addWidgetForm = {
        name: 'sss',
        title: '',
        subtitle: '',
        widgetcontent: '',
        order: '',
        returnUrl: $routeParams.returnUrl
    };

    tinymce.init({
        selector: '#content-submit',
        height: 500,
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons',
        image_advtab: true,
        templates: [
          { title: 'Test template 1', content: 'Test 1' },
          { title: 'Test template 2', content: 'Test 2' }
        ],
        content_css: [
          '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
          '//www.tinymce.com/css/codepen.min.css'
        ]
    });

    $scope.validationOptions = {
        ignore: [],
        rules: {
            title: "required",
            widgetcontent: "required"
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    }

    $scope.add = function (form) {
        $("#widgetcontent").val(tinyMCE.get('content-submit').getContent());
        $scope.addWidgetForm.widgetcontent = tinyMCE.get('content-submit').getContent();
        if (form.validate()) {
            var result = widgetFactory($scope.addWidgetForm.name, $scope.addWidgetForm.title, $scope.addWidgetForm.subtitle, $scope.addWidgetForm.widgetcontent, $scope.addWidgetForm.order);
            //result.then(function (result) {
            //    if (result.success) {
            //        if ($scope.loginForm.returnUrl !== undefined) {
            //            $location.path('/routeOne');
            //        } else {
            //            $location.path($scope.loginForm.returnUrl);
            //        }
            //    } else {
            //        $scope.loginForm.loginFailure = true;
            //    }
            //});
        }
    }

}

widgetController.$inject = ['$scope', '$routeParams', 'widgetFactory'];