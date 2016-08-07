var clientEditFactory = function ($http, $q) {
    
    return function (id, name, logo) {

        var deferredObject = $q.defer();

        $http.post(
            '/Client/Edit', {
                Id: id,
                Name: name,
                Logo: logo
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

clientEditFactory.$inject = ['$http', '$q'];