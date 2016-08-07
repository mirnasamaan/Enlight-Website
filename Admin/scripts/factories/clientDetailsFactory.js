var clientDetailsFactory = function ($http, $q) {

    this.getClient = function (id) {
        return $http.get(
        '/Client/GetDetails?id=' + id
        ).then(function (response) {
            return response.data;
        });

    }
    return this;
}

clientDetailsFactory.$inject = ['$http', '$q'];