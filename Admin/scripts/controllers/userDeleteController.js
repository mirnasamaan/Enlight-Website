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
        ).
        success(function (data) {
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                $location.path('/User/List', false);
            }
        }).
        error(function (data) {
            console.log(data);
        });
    };
}

userDeleteController.$inject = ['$scope', '$routeParams', '$http', '$location', 'userDetailsFactory'];