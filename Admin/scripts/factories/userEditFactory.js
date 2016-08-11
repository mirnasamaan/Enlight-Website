var userEditFactory = function ($http, $q, $location) {
    
    return function (id, email, password, token, creationdate, lastlogindate) {

        var deferredObject = $q.defer();

        $http.post(
            '/User/Edit', {
                Id: id,
                Email: email,
                Password: password,
                UserToken: token,
                CreationDate: creationdate,
                LastLoginDate: lastlogindate
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

userEditFactory.$inject = ['$http', '$q', '$location'];