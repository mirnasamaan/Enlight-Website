var clientAddFactory = function ($http, $q, $location) {
    return function (name, logo) {

        var deferredObject = $q.defer();
        $http.post(
            '/Client/Add', {
                Name: name,
                Logo: '',
                LogoFile: logo
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

        return deferredObject.promise;
    }
}

clientAddFactory.$inject = ['$http', '$q', '$location'];