var clientDeleteController = function ($scope, $routeParams, $http, $location, clientDetailsFactory) {

    clientDetailsFactory.getClient($routeParams.id)
      .then(function (data) {
          $scope.client = data;
      });

    $scope.listClients = function () {
        $location.url('Client/List');
    };

    $scope.confirmDelete = function () {
        $http.post(
            '/Client/ConfirmDelete', {
                Id: $routeParams.id
            }
        ).
        success(function (data) {
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                $location.path('/Client/List', false);
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });
    };
}

clientDeleteController.$inject = ['$scope', '$routeParams', '$http', '$location', 'clientDetailsFactory'];