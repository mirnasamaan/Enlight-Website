var ServerSideProcessingCtrl = function ($scope, DTOptionsBuilder, DTColumnBuilder) {
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
        .withPaginationType('full_numbers');
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('ID').withTitle('Id'),
        DTColumnBuilder.newColumn('Name').withTitle('Name'),
        DTColumnBuilder.newColumn('Title').withTitle('Title'),
        DTColumnBuilder.newColumn('Subtitle').withTitle('Subtitle'),
        DTColumnBuilder.newColumn('Order').withTitle('Order'),
        DTColumnBuilder.newColumn('Actions').withTitle('Actions')
    ];

}

ServerSideProcessingCtrl.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder'];