var contactDetailsController = function ($scope, $routeParams, $http, $location, contactDetailsFactory) {
    contactDetailsFactory.getContact($routeParams.id)
      .then(function (data) {
          $scope.contact = data;
      });

    $scope.listContacts = function () {
        $location.url('Contact/List');
    };
}

contactDetailsController.$inject = ['$scope', '$routeParams', '$http', '$location', 'contactDetailsFactory'];