var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.clicked = {};
	$scope.showClick = function(theData) {
		$scope.clicked = theData;
	}
});