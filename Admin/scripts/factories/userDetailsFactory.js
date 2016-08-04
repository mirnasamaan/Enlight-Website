var userDetailsFactory = function ($http, $q) {

    this.getUser = function (id) {
        return $http.get(
        '/User/GetDetails?id=' + id
        ).then(function (response) {
            return response.data;
        });

    }
    return this;
}

userDetailsFactory.$inject = ['$http', '$q'];