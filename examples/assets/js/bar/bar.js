// bar-module
(function(){
    'use strict';
    angular.module('gridshore.c3js.bar', [
        //'graphApp.services',
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.bar')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bar', {
                url: '/bar',
                templateUrl: 'assets/js/bar/bar.tpl.html',
                controller: 'BarCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.bar')
        .controller('BarCtrl', BarCtrl);

    BarCtrl.$inject = [];
    function BarCtrl() {
        var vm = this;
        vm.chartObj = {};
        vm.isGrouped = false;

        vm.handleCallbackGroup = handleCallbackGroup;
        vm.toggleGroup = toggleGroup;

        function handleCallbackGroup(chartObj) {
            vm.chartObj = chartObj;
        }

        function toggleGroup() {
            if (vm.isGrouped) {
                vm.chartObj.groups([]);
            } else {
                vm.chartObj.groups([['bar1','bar2']]);
            }
            vm.isGrouped = !vm.isGrouped;
            vm.chartObj.flush();
        }
    }
})();