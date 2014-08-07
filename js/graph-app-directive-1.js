var graphApp = angular.module('graphApp', []);

graphApp.directive('c3chart', function($timeout) {
	
	var chartCtrl = function($scope) {
		$scope.chart = null;
		$scope.columns = [];
		$scope.types = {};
		$scope.axis = {};
		$scope.axes = {};
		$scope.xValues= null;
		$scope.xTick = null;

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
			if ($scope.xTick) {
				config.axis.x.tick = $scope.xTick;
			}
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

		this.addXTick = function(tick) {
			$scope.xTick = tick;
		}

		this.rotateAxis = function() {
			$scope.axis.rotated = true;
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
		if (y2) {
			var items = y2.split(",");
			for (item in items) {
				yAxis[items[item]] = "y2";
			}
			if (y) {
				var items = y.split(",");
				for (item in items) {
					yAxis[items[item]] = "y";
				}
			}
			chartCtrl.addYAxis(yAxis);
		}
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
		var rotate = attrs['axisRotate'];
		if (rotate) {
			chartCtrl.rotateAxis();
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"transclude": true,
		"template": "<div ng-transclude></div>",
		"replace":true,
		"link": axisLinker
	}

});

graphApp.directive('chartAxisX', function() {
	var axisLinker = function(scope,element,attrs,chartCtrl) {
		var position=attrs['axisPosition'];
		var label=attrs['axisLabel'];

		var axis={"label":{"text":label,"position":position}};

		var type=attrs['axisType'];
		if (type) {
			axis.type=type;
		}
		// TODO has a strange effect on the graph, need to evaluate
		var height = attrs['axisHeight'];
		if (height) {
			axis.height=height;
		}
		chartCtrl.addAxisProperties('x',axis);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"transclude": true,
		"template": "<div ng-transclude></div>",
		"replace":true,
		"link": axisLinker
	}
});

graphApp.directive('chartAxisY', function() {
	var axisLinker = function(scope,element,attrs,chartCtrl) {
		var id=attrs['axisId'];
		var position=attrs['axisPosition'];
		var label=attrs['axisLabel'];

		var axis={"label":{"text":label,"position":position}};
		if (id === 'y2') {
			axis.show=true;
		}
		var paddingTop = attrs['paddingTop'];
		var paddingBottom = attrs['paddingBottom'];
		if (paddingTop || paddingBottom) {
			paddingTop = (paddingTop) ? paddingTop : 0;
			paddingBottom = (paddingBottom)? paddingBottom : 0;
			axis.padding = {"top":paddingTop,"bottom":paddingBottom};
		}
		var rangeMax = attrs['rangeMax'];
		var rangeMin = attrs['rangeMin'];
		if (rangeMax) {
			axis.max = rangeMax;
		}
		if (rangeMin) {
			axis.min = rangeMin;
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

graphApp.directive('chartAxisXTick', function() {
	var tickLinker = function(scope,element,attrs,chartCtrl) {
		var tick = {};

		var count = attrs['tickCount'];
		if (count) {
			tick.count = count;
		}

		// TODO, dit lijkt nog niet echt iets te doen
		var format = attrs['tickFormat'];
		if (format) {
			tick.format = format;
		}

		var culling = attrs['tickCulling'];
		if (culling) {
			tick.culling = culling;
		}

		var rotate = attrs['tickRotate'];
		if (rotate) {
			tick.rotate = rotate;
		}

		var fit = attrs['tickFit'];
		if (fit) {
			tick.fit = fit;
		}

		chartCtrl.addXTick(tick);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": tickLinker
	}

});

graphApp.controller('GraphCtrl', function ($scope) {

});