var contactDeleteController = function ($scope, $routeParams, $http, $location, contactDetailsFactory) {

    contactDetailsFactory.getContact($routeParams.id)
      .then(function (data) {
          $scope.contact = data;
      });

    $scope.listContacts = function () {
        $location.url('Contact/List');
    };

    $scope.confirmDelete = function () {
        $http.post(
            '/Contact/ConfirmDelete', {
                Id: $routeParams.id
            }
        ).
        success(function (data) {
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                $location.path('/Contact/List', false);
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });
    };
}

contactDeleteController.$inject = ['$scope', '$routeParams', '$http', '$location', 'contactDetailsFactory'];