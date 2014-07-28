var graphApp = angular.module('graphApp', []);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.chart = null;
	$scope.config={};

	$scope.config.data=[]
	$scope.config.data.push({"x":"2014-07-01","data1":20,"data2":30});
	$scope.config.data.push({"x":"2014-07-02","data1":50,"data2":40});
	$scope.config.data.push({"x":"2014-07-03","data1":150,"data2":130});
	$scope.config.data.push({"x":"2014-07-04","data1":125,"data2":150});
	$scope.config.data.push({"x":"2014-07-05","data1":100,"data2":200});
	$scope.config.data.push({"x":"2014-07-06","data1":50,"data2":30});

	$scope.config.type1="spline";
	$scope.config.type2="spline";


	$scope.showGraph = function() {
		var config = {};
		config.bindto = '#chart';
		config.data = {};
		config.data.keys = {"x":"x","value":["data1","data2"]};
		config.data.json = $scope.config.data;
		config.axis = {};
		config.axis.x = {"type":"timeseries","tick":{"format":"%Y-%m-%d"}};
		config.axis.y = {"label":{"text":"Number of items","position":"outer-middle"}};
		config.data.types={"data1":$scope.config.type1,"data2":$scope.config.type2};
		$scope.chart = c3.generate(config);		
	}
});