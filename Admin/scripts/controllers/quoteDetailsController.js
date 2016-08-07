var quoteDetailsController = function ($scope, $routeParams, $http, $location, quoteDetailsFactory) {
    quoteDetailsFactory.getQuote($routeParams.id)
      .then(function (data) {
          $scope.quote = data;
      });

    $scope.listQuotes = function () {
        $location.url('Quote/List');
    };
}

quoteDetailsController.$inject = ['$scope', '$routeParams', '$http', '$location', 'quoteDetailsFactory'];