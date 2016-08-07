var clientEditController = function ($scope, $routeParams, $http, $location, Upload, $timeout, clientEditFactory, clientDetailsFactory) {

    clientDetailsFactory.getClient($routeParams.id)
      .then(function (data) {
          $scope.client = data;
          $scope.picFile = "/Uploads/Clients/" + data.Logo;
      });

    $scope.listClients = function () {
        $location.url('Client/List');
    };

    $scope.validationOptions = {
        ignore: [],
        rules: {
            name: "required"
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    }

    $scope.uploadPic = function (file) {
        if ($scope.editform.validate()) {
            file.upload = Upload.upload({
                url: '/Client/Edit',
                data: { ID: $scope.client.ID, Name: $scope.client.Name, Logo: 'Logo', LogoFile: file },
                type: 'POST'
            })
            .then(function (res) {
                $location.url('Client/List');
            });
        }
    }

    //$scope.edit = function (form) {
    //    if (form.validate()) {
    //        var result = clientEditFactory($scope.client.Id, $scope.client.Name, $scope.client.Logo);
    //    }
    //}
}

clientEditController.$inject = ['$scope', '$routeParams', '$http', '$location', 'Upload', '$timeout', 'clientEditFactory', 'clientDetailsFactory'];