var widgetFactory = function ($http, $q) {
    return function (name, title, subtitle, widgetcontent, order) {

        var deferredObject = $q.defer();

        $http.post(
            '/Widget/Add', {
                Name: name,
                Title: title,
                SubTitle: subtitle,
                Content: widgetcontent,
                Order: order
            }
        ).
        success(function (data) {
            if (data == "True") {
                deferredObject.resolve({ success: true });
            } else {
                deferredObject.resolve({ success: false });
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    }
}

widgetFactory.$inject = ['$http', '$q'];