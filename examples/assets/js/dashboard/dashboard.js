(function(){
    'use strict';
    angular.module('gridshore.c3js.dashboard', [
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.dashboard')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'assets/js/dashboard/dashboard.tpl.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.dashboard')
        .controller('LeftCtrl', LeftCtrl);

    LeftCtrl.$inject = ['$scope','$timeout','$mdSidenav','$log'];
    function LeftCtrl($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [];
    function DashboardCtrl() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();