var userAddController = function ($scope, $routeParams, userAddFactory) {
    $scope.addUserForm = {
        email: '',
        password: '',
        confirmpassword: '',
        returnUrl: $routeParams.returnUrl
    };

    $scope.listUsers = function () {
        $location.url('User/List');
    };

    $scope.validationOptions = {
        ignore: [],
        rules: {
            email: { required: true, email: true},
            password: { required: true },
            confirmpassword: { required: true, equalTo: "#pass" }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    }

    $scope.add = function (form) {
        if (form.validate()) {
            var result = userAddFactory($scope.addUserForm.email, $scope.addUserForm.password);
        }
    }
}

userAddController.$inject = ['$scope', '$routeParams', 'userAddFactory'];