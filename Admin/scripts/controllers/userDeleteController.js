var userDeleteController = function ($scope, $routeParams, $http, $location, userDetailsFactory) {

    userDetailsFactory.getUser($routeParams.id)
      .then(function (data) {
          $scope.user = data;
      });

    $scope.listUsers = function () {
        $location.url('User/List');
    };

    $scope.confirmDelete = function () {
        $http.post(
            '/User/ConfirmDelete', {
                Id: $routeParams.id
            }
        );
    };
}

userDeleteController.$inject = ['$scope', '$routeParams', '$http', '$location', 'userDetailsFactory'];