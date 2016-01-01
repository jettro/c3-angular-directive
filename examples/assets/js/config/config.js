(function(){
    'use strict';
    angular.module('gridshore.c3js.config', [
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.config')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('config', {
                url: '/config',
                templateUrl: 'assets/js/config/config.tpl.html',
                controller: 'ConfigCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.config')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = [];
    function ConfigCtrl() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();