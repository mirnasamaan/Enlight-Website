var clientListController = function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            //dataSrc: 'data',
            url: '/Client/ListClients',
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
        DTColumnBuilder.newColumn('Logo').withTitle('Logo'),
        DTColumnBuilder.newColumn('Actions').withTitle('Actions')
    ];

}

clientListController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder'];