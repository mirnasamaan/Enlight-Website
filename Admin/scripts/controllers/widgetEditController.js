var widgetEditController = function ($scope, $routeParams, $http, $location, widgetEditFactory, widgetDetailsFactory) {

    widgetDetailsFactory.getWidget($routeParams.id)
      .then(function (data) {
          $scope.widget = data;
          console.log(data);
          tinyMCE.activeEditor.setContent(data.Content);
      });

    $scope.listWidgets = function () {
        $location.url('Widget/List');
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
          //'//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
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

    $scope.edit = function (form) {
        alert("in");
        $("#widgetcontent").val(tinyMCE.get('content-submit').getContent());
        $scope.widget.Content = tinyMCE.get('content-submit').getContent();
        if (form.validate()) {
            var result = widgetEditFactory($scope.widget.Id, $scope.widget.Name, $scope.widget.Title, $scope.widget.SubTitle, $scope.widget.Content, $scope.widget.Order);
        }
    }
}

widgetEditController.$inject = ['$scope', '$routeParams', '$http', '$location', 'widgetEditFactory', 'widgetDetailsFactory'];