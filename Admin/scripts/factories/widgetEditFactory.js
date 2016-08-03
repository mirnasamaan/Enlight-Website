var widgetEditFactory = function ($http, $q) {
    
    return function (id, name, title, subtitle, widgetcontent, order) {

        var deferredObject = $q.defer();

        $http.post(
            '/Widget/Edit', {
                Id: id,
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

widgetEditFactory.$inject = ['$http', '$q'];