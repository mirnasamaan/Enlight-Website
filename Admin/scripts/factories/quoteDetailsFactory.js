var quoteDetailsFactory = function ($http, $q) {

    this.getQuote = function (id) {
        return $http.get(
        '/Quote/GetDetails?id=' + id
        ).then(function (response) {
            return response.data;
        });

    }
    return this;
}

quoteDetailsFactory.$inject = ['$http', '$q'];