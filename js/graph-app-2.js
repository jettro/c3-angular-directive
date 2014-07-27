var graphApp = angular.module('graphApp', []);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.chart = null;
	
	$scope.showGraph = function() {
		$scope.chart = c3.generate({
			    bindto: '#chart',
			    data: {
			      columns: [
			        ['data1', 30, 200, 100, 400, 150, 250],
			        ['data2', 50, 20, 10, 40, 15, 25]
			      ]
			    }
			});		
	}
});