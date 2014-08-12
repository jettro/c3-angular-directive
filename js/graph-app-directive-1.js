var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.datapoints=[{"x":10,"top-1":10,"top-2":15},
	                   {"x":20,"top-1":100,"top-2":35},
	                   {"x":30,"top-1":15,"top-2":75},
	                   {"x":40,"top-1":50,"top-2":45}];
	$scope.datacolumns=[{"id":"top-1","type":"line","name":"Top one","color":"black"},
	                    {"id":"top-2","type":"spline","name":"Top two"}];
	$scope.datax={"id":"x"};
});