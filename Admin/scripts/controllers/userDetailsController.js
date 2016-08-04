var userDetailsController = function ($scope, $routeParams, $http, $location, userDetailsFactory) {
    userDetailsFactory.getUser($routeParams.id)
      .then(function (data) {
          $scope.user = data;
      });

    $scope.listUsers = function () {
        $location.url('User/List');
    };
}

userDetailsController.$inject = ['$scope', '$routeParams', '$http', '$location', 'userDetailsFactory'];