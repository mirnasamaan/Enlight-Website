var contactFactory = function ($http, $q, $location) {
    return function (name, email, number, message) {
        alert(number);
        var deferredObject = $q.defer();
        
        $http.post(
            '/Home/AddContact', {
                Name: name,
                Email: email,
                Phone: number,
                Message: message
            }
        ).
        success(function (data) {
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                alert("done");
                $location.path('/', false);
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    }
}

contactFactory.$inject = ['$http', '$q', '$location'];