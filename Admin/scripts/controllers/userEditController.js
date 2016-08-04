var userEditController = function ($scope, $routeParams, $http, $location, userEditFactory, userDetailsFactory) {

    userDetailsFactory.getUser($routeParams.id)
      .then(function (data) {
          console.log(data);
          $scope.user = data;
      });

    $scope.listUsers = function () {
        $location.url('User/List');
    };

    $scope.validationOptions = {
        ignore: [],
        rules: {
            email: "required",
            password: "required",
            confirmpassword: { required: true, equalTo: "#pass" }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    }

    $scope.edit = function (form) {
        if (form.validate()) {
            var result = userEditFactory($scope.user.Id, $scope.user.Email, $scope.user.Password, $scope.user.UserToken, $scope.user.ConfirmationDate, $scope.user.LastLoginDate);
        }
    }
}

userEditController.$inject = ['$scope', '$routeParams', '$http', '$location', 'userEditFactory', 'userDetailsFactory'];