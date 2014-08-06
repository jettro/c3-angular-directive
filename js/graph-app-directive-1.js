var graphApp = angular.module('graphApp', []);

graphApp.directive('c3chart', function($timeout) {
	
	var chartCtrl = function($scope) {
		$scope.chart = null;
		$scope.columns = [];
		$scope.types = {};
		$scope.axis = {};
		$scope.axes = {};
		$scope.xValues= null;

		this.addColumn = function(column,columnType) {
			$scope.columns.push(column);
			if (columnType !== undefined) {
				$scope.types[column[0]]=columnType;
			}
		};

		this.showGraph = function() {
			var config = {};			
			config.bindto = "#"+$scope.bindto;
			config.data = {}
			if ($scope.xValues) {
				config.data.x=$scope.xValues;
			}
			config.data.columns = $scope.columns;
			config.data.types = $scope.types;
			config.data.axes = $scope.axes;
			config.axis = $scope.axis;
			console.log(config);
			$scope.chart = c3.generate(config);				
		};

		this.addYAxis = function(yAxis) {
			$scope.axes = yAxis;
			if (!$scope.axis.y2) {
				$scope.axis.y2={"show":true};				
			}
		};

		this.addXAxisValues = function(xValues) {
			$scope.xValues = xValues;
		};

		this.addAxisProperties = function(id,axis) {
			$scope.axis[id]=axis;
		};
	};

	var chartLinker = function(scope,element,attrs,chartCtrl) {
		// Trick to wait for all rendering of the DOM to be finished.
		$timeout(function() {
			chartCtrl.showGraph()
		});
	};

	return {
		"restrict": "E",
		"scope": {
			"bindto":"@bindtoId"
		},
		"template":"<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
		"replace":true,
		"transclude":true,
		"controller": chartCtrl,
		"link": chartLinker
	}
});

graphApp.directive('chartColumn', function() {
	var columnLinker = function(scope,element,attrs,chartCtrl) {
		var column = attrs['columnValues'].split(",");
		column.unshift(attrs['columnTitle']);
		chartCtrl.addColumn(column,attrs['columnType']);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": columnLinker
	}
});

graphApp.directive('chartAxes', function() {
	var axesLinker = function(scope,element,attrs,chartCtrl) {
		var x = attrs['valuesX'];
		if (x) {
			chartCtrl.addXAxisValues(x);
		}

		var y = attrs['y'];
		var y2 = attrs['y2'];
		var yAxis = {};
		if (y) {
			var items = y.split(",");
			for (item in items) {
				yAxis[items[item]] = "y";
			}
		}
		if (y2) {
			var items = y2.split(",");
			for (item in items) {
				yAxis[items[item]] = "y2";
			}
		}
		chartCtrl.addYAxis(yAxis);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": axesLinker
	}
});

graphApp.directive('chartAxis', function() {
	var axisLinker = function(scope,element,attrs,chartCtrl) {
		console.log("In the chart axis linker");

		var id=attrs['axisId'];
		var position=attrs['axisPosition'];
		var label=attrs['axisLabel'];

		var axis={"label":{"text":label,"position":position}};
		if (id === 'y2') {
			axis.show=true;
		}

		chartCtrl.addAxisProperties(id,axis);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": axisLinker
	}
});

graphApp.controller('GraphCtrl', function ($scope) {

});