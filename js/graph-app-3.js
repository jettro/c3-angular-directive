var graphApp = angular.module('graphApp', []);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.chart = null;
	$scope.config={};
	$scope.config.data1="30, 200, 100, 200, 150, 250";
	$scope.config.data2="70, 30, 10, 240, 150, 125";

	$scope.typeOptions=["line","bar","spline","step","area","area-step","area-spline"];

	$scope.config.type1=$scope.typeOptions[0];
	$scope.config.type2=$scope.typeOptions[1];


	$scope.showGraph = function() {
		var config = {};
		config.bindto = '#chart';
		config.data = {};
		config.data.json = {};
		config.data.json.data1 = $scope.config.data1.split(",");
		config.data.json.data2 = $scope.config.data2.split(",");
		config.axis = {"y":{"label":{"text":"Number of items","position":"outer-middle"}}};
		config.data.types={"data1":$scope.config.type1,"data2":$scope.config.type2};
		$scope.chart = c3.generate(config);		
	}
});