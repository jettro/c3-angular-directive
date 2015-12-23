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
        vm.piePoints = [{"data1": 70, "data2": 30, "data3": "100"}];
        vm.pieColumns = [{"id": "data1", "type": "pie"}, {"id": "data2", "type": "pie"}, {
            "id": "data3",
            "type": "pie"
        }];

        vm.handleCallback = function (chartObj) {
            vm.theChart = chartObj;
        };

        vm.legendIsShown = true;
        vm.toggleLegend = function() {
            if (vm.legendIsShown) {
                vm.theChart.legend.hide();
            } else {
                vm.theChart.legend.show();
            }
            vm.legendIsShown= !vm.legendIsShown;
            vm.theChart.flush();
        };

        vm.showClick = showClick;

        activate();

        function activate() {

        }

        function showClick(data) {
            vm.clicked = data;
        }

    }
})();