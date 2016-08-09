var quoteFactory = function ($http, $q, $location) {
    return function (name, email, phone, category, type, message, recommend) {
        var deferredObject = $q.defer();

        $http.post(
            '/Home/AddQuote', {
                Name: name,
                Email: email,
                Phone: phone,
                Category: category,
                Type: type,
                Message: message,
                KnowledgeBase: recommend
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

quoteFactory.$inject = ['$http', '$q', '$location'];