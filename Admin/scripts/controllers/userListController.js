var userListController = function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            //dataSrc: 'data',
            url: '/User/ListUsers',
            type: 'POST'
        })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers');
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('ID').withTitle('Id'),
        DTColumnBuilder.newColumn('Email').withTitle('Email'),
        DTColumnBuilder.newColumn('CreationDate').withTitle('Creation Date'),
        DTColumnBuilder.newColumn('LastLoginDate').withTitle('Last Login Date'),
        DTColumnBuilder.newColumn('Actions').withTitle('Actions')
    ];

}

userListController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder'];