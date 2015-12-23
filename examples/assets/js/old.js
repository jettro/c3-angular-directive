var graphApp = angular.module('graphApp', ['gridshore.c3js.chart', 'graphApp.services']);

graphApp.controller('GraphCtrl', function ($scope, $interval, dataService) {
    $scope.datapoints = [];
    $scope.datacolumns = [{"id": "top-1", "type": "line", "name": "Top one"},
        {"id": "top-2", "type": "spline", "name": "Top two"}];
    $scope.datax = {"id": "x"};

    $scope.donutPoints = [{"data1": 70, "data2": 30, "data3": 50, "data4": 40, "data5": 10}];
    $scope.donutColumns = [
        {"id": "data1", "type": "donut"},
        {"id": "data2", "type": "donut"},
        {"id": "data3", "type": "donut"},
        {"id": "data4", "type": "donut"},
        {"id": "data5", "type": "donut"}];
    $scope.donutPoints2 = [{"data1": 70, "data2": 30}];
    $scope.donutColumns2 = [
        {"id": "data1", "type": "donut"},
        {"id": "data2", "type": "donut"}];
    $scope.donutTitle = "Dynamic Title";

    $scope.piePoints = [{"data1": 70, "data2": 30, "data3": "100"}];
    $scope.pieColumns = [{"id": "data1", "type": "pie"}, {"id": "data2", "type": "pie"}, {
        "id": "data3",
        "type": "pie"
    }];

    $scope.handleCallback = function (chartObj) {
        $scope.theChart = chartObj;
    };

    $scope.legendIsShown = true;
    $scope.toggleLegend = function() {
        if ($scope.legendIsShown) {
            $scope.theChart.legend.hide();
        } else {
            $scope.theChart.legend.show();
        }
        $scope.legendIsShown= !$scope.legendIsShown;
        $scope.theChart.flush();
    };

    $scope.generateData = function () {
        $interval(function () {
            dataService.loadData(function (data) {
                if ($scope.datapoints.length > 10) {
                    $scope.datapoints.shift();
                }
                $scope.datapoints.push(data);
            });
        }, 1000, 1000);
    };

    $scope.clicked = {};
    $scope.showClick = function (data) {
        $scope.clicked = data;
    };

    $scope.formatDonut = function (value, ratio, id) {
        return d3.format('$')(value);
    };
});

var services = angular.module('graphApp.services', []);
services.factory('dataService', function () {
    function DataService() {
        var maxNumber = 200;

        // API methods
        this.loadData = function (callback) {
            callback({"x": new Date(), "top-1": randomNumber(), "top-2": randomNumber()});
        };

        function randomNumber() {
            return Math.floor((Math.random() * maxNumber) + 1);
        }
    }

    return new DataService();
});