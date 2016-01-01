(function(){
    'use strict';
    angular.module('gridshore.c3js.dynamic', [
        'ui.router'
    ]);
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.dynamic')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dynamic', {
                url: '/dynamic',
                templateUrl: 'assets/js/dynamic/dynamic.tpl.html',
                controller: 'DynamicCtrl',
                controllerAs: 'vm'
            });
    }
})();

(function(){
    'use strict';
    angular.module('gridshore.c3js.dynamic')
        .controller('DynamicCtrl', DynamicCtrl);

    DynamicCtrl.$inject = ['$interval','dateFilter'];
    function DynamicCtrl($interval, dateFilter) {
        var vm = this;
        vm.generateData = generateData;
        vm.datapoints = [];
        vm.datacolumns = [{"id": "top-1", "type": "line", "name": "Top one"},
            {"id": "top-2", "type": "spline", "name": "Top two"}];
        vm.datax = {"id": "x"};

        function generateData() {
            $interval(function () {
                loadData(function (data) {
                    if (vm.datapoints.length > 10) {
                        vm.datapoints.shift();
                    }
                    vm.datapoints.push(data);
                });
            }, 1000, 10);
        }

        function loadData (callback) {
            var aDate = dateFilter(new Date(),'yyyy-MM-dd hh:mm:ss');
            callback({"x": aDate, "top-1": randomNumber(), "top-2": randomNumber()});
        }

        function randomNumber() {
            return Math.floor((Math.random() * 200) + 1);
        }
    }
})();