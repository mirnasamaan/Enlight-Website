var clientAddController = function ($scope, $routeParams, $location, Upload, $timeout, clientAddFactory) {
    $scope.addClientForm = {
        name: '',
        logo: '',
        returnUrl: $routeParams.returnUrl
    };

    $scope.listClients = function () {
        $location.url('Client/List');
    };

    $scope.validationOptions = {
        ignore: [],
        rules: {
            name: { required: true },
            file: { required: true }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    }

    $scope.uploadPic = function (file) {
        if ($scope.addform.validate()) {
            file.upload = Upload.upload({
                url: '/Client/Add',
                data: { Name: $scope.name, Logo: 'Logo', LogoFile: file },
                type: 'POST'
            });

            file.upload.then(function (response) {
                if (response.status == 200) {
                    $location.url('Client/List');
                }
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }
}

clientAddController.$inject = ['$scope', '$routeParams', '$location', 'Upload', '$timeout', 'clientAddFactory'];