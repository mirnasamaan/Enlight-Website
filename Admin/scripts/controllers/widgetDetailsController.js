var widgetDetailsController = function ($scope, $routeParams, $http, widgetDetailsFactory) {

    widgetDetailsFactory.getWidget($routeParams.id)
      .then(function (data) {
          $scope.widget = data;
          tinyMCE.activeEditor.setContent(data.Content);
      });

    tinymce.init({
        selector: '.content',
        height: 500,
        theme: 'modern',
        readonly: 1,
        toolbar: false,
        menubar: false,
        content_css: [
          //'//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
          '//www.tinymce.com/css/codepen.min.css'
        ]
    });
}

widgetDetailsController.$inject = ['$scope', '$routeParams', '$http', 'widgetDetailsFactory'];