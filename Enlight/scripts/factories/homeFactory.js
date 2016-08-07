var homeFactory = function ($http, $q) {

    this.getHomeContent = function () {

        return $http.get(
        '/Home/ListWidgets'
        ).then(function (response) {
            return response.data;
        });

    }

    this.getClientContent = function () {

        return $http.get(
        '/Home/ListClients'
        ).then(function (response) {
            return response.data;
        });

    }

    return this;
}

homeFactory.$inject = ['$http', '$q'];