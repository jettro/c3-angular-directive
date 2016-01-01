(function(){
    'use strict';
    angular.module('gridshore.c3js.callback', [
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.callback')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('callback', {
                url: '/callback',
                templateUrl: 'assets/js/callback/callback.tpl.html',
                controller: 'CallbackCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.callback')
        .controller('CallbackCtrl', CallbackCtrl);

    CallbackCtrl.$inject = [];
    function CallbackCtrl() {
        var vm = this;
        vm.clicked = {};
        vm.selected = undefined;
        vm.legendIsShown = true;

        vm.piePoints = [{"data1": 70, "data2": 30, "data3": "100"}];
        vm.pieColumns = [{"id": "data1", "type": "pie"}, {"id": "data2", "type": "pie"},
            {"id": "data3","type": "pie"}];

        vm.piePointsSelected = [];
        vm.pieColumnsSelected = [];

        vm.piePointsLabel = [{"data1": 1, "data2": 1}];
        vm.pieColumnsLabel = [{"id": "data1", "type": "pie"}, {"id": "data2", "type": "pie"}];

        vm.selectItem = selectItem;
        vm.handleCallback = handleCallback;
        vm.toggleLegend = toggleLegend;
        vm.showClick = showClick;
        vm.clickLegend = clickLegend;

        function selectItem(data) {
            vm.selected = data;
            if (data.name === 'data1') {
                vm.piePointsSelected = [{'data11':35},{'data12':40},{'data13':10}];
                vm.pieColumnsSelected = [{'id':'data11','type':'pie'},{'id':'data12','type':'pie'},{'id':'data13','type':'pie'}]
            } else if(data.name === 'data2') {
                vm.piePointsSelected = [{'data21':65},{'data22':80}];
                vm.pieColumnsSelected = [{'id':'data21','type':'pie'},{'id':'data22','type':'pie'}];
            } else if (data.name === 'data3') {
                vm.piePointsSelected = [{'data31':95},{'data32':10}];
                vm.pieColumnsSelected = [{'id':'data31','type':'pie'},{'id':'data32','type':'pie'}];
            }
        }

        function handleCallback(chartObj) {
            vm.theChart = chartObj;
        }

        function toggleLegend() {
            if (vm.legendIsShown) {
                vm.theChart.legend.hide();
            } else {
                vm.theChart.legend.show();
            }
            vm.legendIsShown= !vm.legendIsShown;
            vm.theChart.flush();
        }

        function clickLegend(data) {
            vm.piePointsLabel[0][data]+=1;
        }

        function showClick(data) {
            vm.clicked = data;
        }
    }
})();