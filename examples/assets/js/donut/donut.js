(function(){
    'use strict';
    angular.module('gridshore.c3js.donut', [
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.donut')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('donut', {
                url: '/donut',
                templateUrl: 'assets/js/donut/donut.tpl.html',
                controller: 'DonutCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.donut')
        .controller('DonutCtrl', DonutCtrl);

    DonutCtrl.$inject = [];
    function DonutCtrl() {
        var vm = this;
        vm.donutPoints = [{"data1": 70, "data2": 30, "data3": 50, "data4": 40, "data5": 10}];
        vm.donutColumns = [
            {"id": "data1", "type": "donut"},
            {"id": "data2", "type": "donut"},
            {"id": "data3", "type": "donut"},
            {"id": "data4", "type": "donut"},
            {"id": "data5", "type": "donut"}];
        vm.selectedItems = [];

        vm.formatDonut = formatDonut;
        vm.handleCallback = handleCallback;
        vm.handleClick = handleClick;

        function formatDonut(value, ratio, id) {
            return d3.format('$')(value);
        }

        function handleCallback(chartObj) {
            vm.theChart = chartObj;
        }

        function handleClick(data) {
            vm.selectedItems = vm.theChart.selected();
        }
    }
})();