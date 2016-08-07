var quoteListController = function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            //dataSrc: 'data',
            url: '/Quote/ListQuotes',
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
        DTColumnBuilder.newColumn('Category').withTitle('Category'),
        DTColumnBuilder.newColumn('Type').withTitle('Type'),
        DTColumnBuilder.newColumn('Message').withTitle('Message'),
        DTColumnBuilder.newColumn('KnowledgeBase').withTitle('Knowledge Base'),
        DTColumnBuilder.newColumn('Actions').withTitle('Actions')
    ];

}

quoteListController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder'];