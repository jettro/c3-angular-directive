var graphApp = angular.module('graphApp', []);

graphApp.directive('c3chart', function($timeout) {
	
	var chartCtrl = function($scope) {
		$scope.chart = null;
		$scope.columns = [];
		$scope.types = {};

		this.addColumn = function(column,columnType) {
			$scope.columns.push(column);
			if (columnType !== undefined) {
				$scope.types[column[0]]=columnType;
			}
		}

		this.showGraph = function() {
			var config = {};			
			config.bindto = "#"+$scope.bindto;
			config.data = {}
			if ($scope.xValues) {
				config.data.x=$scope.xValues;
			}
			config.data.columns = $scope.columns;
			config.data.types = $scope.types;
			$scope.chart = c3.generate(config);				
		}
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
			"bindto":"@bindtoId",
			"xValues":"@valuesX"
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

graphApp.controller('GraphCtrl', function ($scope) {

});