var contactDetailsFactory = function ($http, $q) {

    this.getContact = function (id) {
        return $http.get(
        '/Contact/GetDetails?id=' + id
        ).then(function (response) {
            return response.data;
        });

    }
    return this;
}

contactDetailsFactory.$inject = ['$http', '$q'];