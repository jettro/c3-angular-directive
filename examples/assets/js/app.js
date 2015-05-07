var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {
    $scope.clicked = {};

    $scope.showClick = function(data) {
        $scope.clicked = data;
    }
});