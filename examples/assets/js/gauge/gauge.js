(function(){
    'use strict';
    angular.module('gridshore.c3js.gauge', [
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.gauge')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('gauge', {
                url: '/gauge',
                templateUrl: 'assets/js/gauge/gauge.tpl.html',
                controller: 'GaugeCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.gauge')
        .controller('GaugeCtrl', GaugeCtrl);

    GaugeCtrl.$inject = ['$interval'];
    function GaugeCtrl($interval) {
        var vm = this;

        activate();

        function activate() {
            vm.gaugePoint = [{"data1": 70}];
            vm.gaugeColumn = [
                {"id": "data1", "type": "gauge"}];

            $interval(function () {
                vm.gaugePoint[0]['data1'] = randomNumber();
            }, 1000, 10);

        }

        function randomNumber() {
            return Math.floor((Math.random() * 100) + 1);
        }
    }
})();