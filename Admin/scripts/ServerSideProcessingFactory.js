var ServerSideProcessingFactory = function ($http, $q, $scope, DTOptionsBuilder, DTColumnBuilder) {
    return function () {
        alert("datatable");
        var deferredObject = $q.defer();

        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                // Either you specify the AjaxDataProp here
                //dataSrc: 'data',
                url: '/Widget/ListWidgets',
                type: 'POST'
            })
         // or here
         .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withPaginationType('full_numbers')
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('ID').withTitle('Id'),
            DTColumnBuilder.newColumn('Name').withTitle('Name'),
            DTColumnBuilder.newColumn('Title').withTitle('Title'),
            DTColumnBuilder.newColumn('Subtitle').withTitle('Subtitle'),
            DTColumnBuilder.newColumn('Order').withTitle('Order'),
            DTColumnBuilder.newColumn('Actions').withTitle('Actions')
        ];

        return deferredObject.promise;
    }
}

ServerSideProcessingFactory.$inject = ['$http', '$q', '$scope', 'DTOptionsBuilder', 'DTColumnBuilder'];