var clientDetailsController = function ($scope, $routeParams, $http, $location, clientDetailsFactory) {
    clientDetailsFactory.getClient($routeParams.id)
      .then(function (data) {
          $scope.client = data;
      });

    $scope.listClients = function () {
        $location.url('Client/List');
    };
}

clientDetailsController.$inject = ['$scope', '$routeParams', '$http', '$location', 'clientDetailsFactory'];