var contactListController = function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            //dataSrc: 'data',
            url: '/Contact/ListContacts',
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
        DTColumnBuilder.newColumn('Email').withTitle('Email'),
        DTColumnBuilder.newColumn('Phone').withTitle('Phone'),
        DTColumnBuilder.newColumn('Message').withTitle('Message'),
        DTColumnBuilder.newColumn('Actions').withTitle('Actions')
    ];

}

contactListController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder'];