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

    GaugeCtrl.$inject = [];
    function GaugeCtrl() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();