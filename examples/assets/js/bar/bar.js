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

        activate();

        function activate() {

        }
    }
})();