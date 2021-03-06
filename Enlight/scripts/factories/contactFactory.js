﻿var contactFactory = function ($http, $q, $location) {
    return function (name, email, number, message) {
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
            if (data == "True") {
                deferredObject.resolve({ success: true });
            } else {
                deferredObject.resolve({ success: true });
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    }
}

contactFactory.$inject = ['$http', '$q', '$location'];