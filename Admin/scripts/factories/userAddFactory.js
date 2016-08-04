var userAddFactory = function ($http, $q, $location) {
    return function (email, password) {

        var deferredObject = $q.defer();
        $http.post(
            '/User/Add', {
                Email: email,
                Password: password,
                UserToken: '',
                CreationDate: '',
                LastLoginDate: ''
            }
        ).
        success(function (data) {
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                $location.path('/User/List', false);
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    }
}

userAddFactory.$inject = ['$http', '$q', '$location'];