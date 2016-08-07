var quoteDeleteController = function ($scope, $routeParams, $http, $location, quoteDetailsFactory) {

    quoteDetailsFactory.getQuote($routeParams.id)
      .then(function (data) {
          $scope.quote = data;
      });

    $scope.listQuotes = function () {
        $location.url('Quote/List');
    };

    $scope.confirmDelete = function () {
        $http.post(
            '/Quote/ConfirmDelete', {
                Id: $routeParams.id
            }
        ).
        success(function (data) {
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                $location.path('/Quote/List', false);
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });
    };
}

quoteDeleteController.$inject = ['$scope', '$routeParams', '$http', '$location', 'quoteDetailsFactory'];