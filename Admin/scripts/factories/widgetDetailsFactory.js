var widgetDetailsFactory = function ($http, $q) {
    this.getWidget = function (id) {

        return $http.get(
        '/Widget/GetDetails?id=' + id
        ).then(function (response) {
            return response.data;
        });

    }
    return this;
}

widgetDetailsFactory.$inject = ['$http', '$q'];