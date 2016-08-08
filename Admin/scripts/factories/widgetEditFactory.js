var widgetEditFactory = function ($http, $q, $location) {
    
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
            var obj = JSON.parse(data);
            if (obj.success == "false") {
                alert(obj.msg)
            } else {
                $location.path('/Widget/List', false);
            }
        }).
        error(function (data) {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    }
}

widgetEditFactory.$inject = ['$http', '$q', '$location'];