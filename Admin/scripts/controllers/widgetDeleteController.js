var widgetDeleteController = function ($scope, $routeParams, $http, $location, widgetDetailsFactory) {

    widgetDetailsFactory.getWidget($routeParams.id)
      .then(function (data) {
          $scope.widget = data;
          tinyMCE.activeEditor.setContent(data.Content);
      });

    $scope.listWidgets = function () {
        $location.url('Widget/List');
    };

    $scope.confirmDelete = function () {
        $http.post(
            '/Widget/ConfirmDelete', {
                Id: $routeParams.id
            }
        );
    };

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

widgetDeleteController.$inject = ['$scope', '$routeParams', '$http', '$location', 'widgetDetailsFactory'];