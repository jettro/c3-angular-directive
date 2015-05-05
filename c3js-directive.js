angular.module('gridshore.c3js.chart', [])
.controller('ChartController',['$scope', function($scope) {
	// TODO Do we still need this initializer? Looks like we just need to call resetVars()
	$scope.chart = null;
	$scope.columns = [];
	$scope.types = {};
	$scope.axis = {};
	$scope.axes = {};
	$scope.padding = null;
	$scope.xValues= null;
    $scope.xsValues = null;
	$scope.xTick = null;
	$scope.yTick = null;
	$scope.names = null;
	$scope.colors = null;
	$scope.grid = null;
	$scope.legend = null;
	$scope.tooltip = null;
	$scope.chartSize = null;
	$scope.colors = null;
	$scope.gauge = null;
	$scope.jsonKeys = null;
	$scope.groups = null;

	function resetVars() {
		$scope.chart = null;
		$scope.columns = [];
		$scope.types = {};
		$scope.axis = {};
		$scope.axes = {};
		$scope.padding = null;
		$scope.xValues= null;
		$scope.xsValues = null;
		$scope.xTick = null;
		$scope.names = null;
		$scope.colors = null;
		$scope.grid = null;
		$scope.legend = null;
		$scope.tooltip = null;
		$scope.chartSize = null;
		$scope.colors = null;
		$scope.gauge = null;
		$scope.jsonKeys = null;
		$scope.groups = null;
	};

	resetVars();

	this.showGraph = function() {
		var config = {};
		config.bindto = "#"+$scope.bindto;
		config.data = {};

		if ($scope.xValues) {
			config.data.x=$scope.xValues;
		}
		if ($scope.xsValues) {
			config.data.xs=$scope.xsValues;
		}
		if ($scope.columns) {
			config.data.columns = $scope.columns;
		}
		config.data.types = $scope.types;
		config.data.axes = $scope.axes;
		if ($scope.names) {
			config.data.names = $scope.names;
		}
		if ($scope.padding != null) {
			config.padding = $scope.padding;
		}
		if ($scope.colors) {
			config.data.colors = $scope.colors;
		}
		if ($scope.colorFunction) {
			config.data.color = $scope.colorFunction;
		}
		if ($scope.showLabels && $scope.showLabels === "true") {
			config.data.labels=true;
		}
		if ($scope.groups != null) {
			config.data.groups = $scope.groups;
		}
		if ($scope.showSubchart && $scope.showSubchart === "true") {
			config.subchart = {"show":true};
		}
		if ($scope.enableZoom && $scope.enableZoom === "true") {
			config.zoom = {"enabled":true};
		}
		config.axis = $scope.axis;
		if ($scope.xTick) {
			config.axis.x.tick = $scope.xTick;
		}
		if ($scope.yTick) {
			config.axis.y.tick = $scope.yTick;
		}
		if ($scope.grid != null) {
			config.grid = $scope.grid;
		}
		if ($scope.legend != null) {
			config.legend = $scope.legend;
		}
		if ($scope.tooltip != null) {
			config.tooltip = $scope.tooltip;
		}
		if ($scope.chartSize != null) {
			config.size = $scope.chartSize;
		}
		if ($scope.colors != null) {
			config.color = {"pattern":$scope.colors};
		}
		if ($scope.gauge != null) {
			config.gauge = $scope.gauge;
		}
		if ($scope.onInit != null) {
			config.oninit = $scope.onInit;
		}
		if ($scope.onMouseover != null) {
			config.onmouseover = $scope.onMouseover;
		}
		if ($scope.onMouseout != null) {
			config.onmouseout = $scope.onMouseout;
		}
		if ($scope.onRendered != null) {
			config.onrendered = $scope.onRendered;
		}
		if ($scope.onResize != null) {
			config.onresize = $scope.onResize;
		}
		if ($scope.onResized != null) {
			config.onresized = $scope.onResized;
		}
		if ($scope.dataOnClick != null) {
			config.data.onclick = function(data, element) {
				$scope.dataOnClick({"data":data,"element":element});
			};
		}
		if ($scope.dataOnMouseover != null) {
			config.data.onmouseover = function(data) {
				$scope.dataOnMouseover({"data":data});
			};
		}
		if ($scope.dataOnMouseout != null) {
			config.data.onmouseout = function(data) {
				$scope.dataOnMouseout({"data":data});
			};
		}


		$scope.config = config;

		if ($scope.chartData && $scope.chartColumns) {
			$scope.$watchCollection('chartData', function() {
				loadChartData();
			});
		} else {
			$scope.chart = c3.generate($scope.config);
		}

		$scope.$on('$destroy', function() {
			if (angular.isDefined($scope.chart)) {
				$scope.chart = $scope.chart.destroy();
				resetVars();
			}
		});
	};

	this.addColumn = function(column,columnType,columnName,columnColor) {
		$scope.columns.push(column);
		addColumnProperties(column[0], columnType, columnName, columnColor);
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

	this.addXSValues = function(xsValues) {
		$scope.xsValues = xsValues;
	};

	this.addAxisProperties = function(id,axis) {
		$scope.axis[id]=axis;
	};

	this.addXTick = function(tick) {
		$scope.xTick = tick;
	};

	this.addYTick = function(tick) {
		$scope.yTick = tick;
	};

	this.rotateAxis = function() {
		$scope.axis.rotated = true;
	};

	this.addPadding = function(side, amount) {
		if ($scope.padding == null) {
			$scope.padding = {};
		}
		$scope.padding[side] = parseInt(amount);
	}

	this.addGrid = function(axis) {
		if ($scope.grid == null) {
			$scope.grid = {};
		}
		if ($scope.grid[axis] == null) {
			$scope.grid[axis] = {};
		}
		$scope.grid[axis].show = true;
	};

	this.addGridLine = function(axis,value,text) {
		if ($scope.grid == null) {
			$scope.grid = {};
		}
		if (axis === "x") {
			if ($scope.grid.x === undefined) {
				$scope.grid.x = {};
			}
			if ($scope.grid.x.lines === undefined) {
				$scope.grid.x.lines = [];
			}
		} else {
			if ($scope.grid.y === undefined) {
				$scope.grid.y = {};
			}
			if ($scope.grid.y.lines === undefined) {
				$scope.grid.y.lines = [];
			}

		}
		if (axis === "y2") {
			$scope.grid.y.lines.push({"value":value,"text":text,"axis":"y2"});
		} else {
			$scope.grid[axis].lines.push({"value":value,"text":text});
		}
	};

	this.addLegend = function(legend) {
		$scope.legend = legend;
	};

	this.addTooltip = function(tooltip) {
		$scope.tooltip = tooltip;
	};

	this.addSize = function(chartSize) {
		$scope.chartSize = chartSize;
	};

	this.addColors = function(colors) {
		$scope.colors = colors;
	};

	this.addColorFunction = function(colorFunction) {
		$scope.colorFunction = colorFunction;
	};

	this.addOnInitFunction = function(onInitFunction) {
		$scope.onInit = onInitFunction;
	};

	this.addOnMouseoverFunction = function(onMouseoverFunction) {
		$scope.onMouseover = onMouseoverFunction;
	};

	this.addOnMouseoutFunction = function(onMouseoutFunction) {
		$scope.onMouseout = onMouseoutFunction;
	};

	this.addOnRenderedFunction = function(onRederedFunction) {
		$scope.onRendered = onRederedFunction;
	};	

	this.addOnResizeFunction = function(onResizeFunction) {
		$scope.onResize = onResizeFunction;
	};

	this.addOnResizedFunction = function(onResizedFuncton) {
		$scope.onResized = onResizedFuncton;
	};

	this.addDataOnClickFunction = function(theFunction) {
		$scope.dataOnClick = theFunction;
	};

	this.addDataOnMouseoverFunction = function(theFunction) {
		$scope.dataOnMouseover = theFunction;
	};

	this.addDataOnMouseoutFunction = function(theFunction) {
		$scope.dataOnMouseout = theFunction;
	};

	this.addGauge = function (gauge) {
		$scope.gauge = gauge;
	};

	this.addGroup = function (group) {
		if ($scope.groups == null) {
			$scope.groups = [];
		}
		$scope.groups.push(group);
	};

	this.hideGridFocus = function() {
		if ($scope.grid == null) {
			$scope.grid = {};
		}
		$scope.grid["focus"] = {"show": false};
	};

	function addColumnProperties(id, columnType, columnName, columnColor) {
		if (columnType !== undefined) {
			$scope.types[id]=columnType;
		}
		if (columnName !== undefined) {
			if ($scope.names === null) {
				$scope.names = {};
			}
			$scope.names[id]=columnName;
		}
		if (columnColor !== undefined) {
			if ($scope.colors === null) {
				$scope.colors = {};
			}
			$scope.colors[id]=columnColor;
		}
	}

	function loadChartData() {
		$scope.jsonKeys = {};
		$scope.jsonKeys.value = [];
		angular.forEach($scope.chartColumns, function (column) {
			$scope.jsonKeys.value.push(column.id);
			addColumnProperties(column.id, column.type, column.name, column.color);
		});
		if ($scope.chartX) {
			$scope.jsonKeys.x = $scope.chartX.id;
		}
		if ($scope.names) {
			$scope.config.data.names = $scope.names;
		}
		if ($scope.colors) {
			$scope.config.data.colors = $scope.colors;
		}
		if ($scope.groups) {
			$scope.config.data.groups = $scope.groups;
		}

		$scope.config.data.keys = $scope.jsonKeys;
		$scope.config.data.json = $scope.chartData;

		$scope.chart = c3.generate($scope.config);

		// $scope.chart.load(data);
	}
}])
.directive('c3chart', ['$timeout', function($timeout) {
	var chartLinker = function(scope,element,attrs,chartCtrl) {
		var paddingTop = attrs.paddingTop;
		var paddingRight = attrs.paddingRight;
		var paddingBottom = attrs.paddingBottom;
		var paddingLeft = attrs.paddingLeft;

		if (paddingTop) {
			chartCtrl.addPadding('top', paddingTop);
		}
		if (paddingRight) {
			chartCtrl.addPadding('right', paddingRight);
		}
		if (paddingBottom) {
			chartCtrl.addPadding('bottom', paddingBottom);
		}
		if (paddingLeft) {
			chartCtrl.addPadding('left', paddingLeft);
		}
		// Trick to wait for all rendering of the DOM to be finished.
		$timeout(function() {
			chartCtrl.showGraph();
		});
	};

	return {
		"restrict": "E",
		"controller":"ChartController",
		"scope": {
			"bindto":"@bindtoId",
			"showLabels":"@showLabels",
			"showSubchart":"@showSubchart",
			"enableZoom":"@enableZoom",
			"chartData":"=chartData",
			"chartColumns":"=chartColumns",
			"chartX":"=chartX"
		},
		"template":"<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
		"replace":true,
		"transclude":true,
		"link": chartLinker
	};
}])
.directive('chartColumn', function() {
	var columnLinker = function(scope,element,attrs,chartCtrl) {
		var column = attrs.columnValues.split(",");
		column.unshift(attrs.columnId);
		chartCtrl.addColumn(column,attrs.columnType,attrs.columnName,attrs.columnColor);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": columnLinker
	};
})
.directive('chartAxes', function() {
	var axesLinker = function(scope,element,attrs,chartCtrl) {
		var x = attrs.valuesX;
		if (x) {
			chartCtrl.addXAxisValues(x);
		}

		var xs = attrs.valuesXs;
		var xsValues = {};
		if (xs) {
			xsItems = xs.split(",");
			for (var xsI in xsItems) {
				xsItem = xsItems[xsI].split(":");
				xsValues[xsItem[0]] = xsItem[1];
			}
			chartCtrl.addXSValues(xsValues);
		}

		var y = attrs.y;
		var y2 = attrs.y2;
		var yAxis = {};
		if (y2) {
			var items = y2.split(",");
			for (var item in items) {
				yAxis[items[item]] = "y2";
			}
			if (y) {
				var yItems = y.split(",");
				for (var yItem in yItems) {
					yAxis[yItems[yItem]] = "y";
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
	};
})
.directive('chartAxis', function() {
	var axisLinker = function(scope,element,attrs,chartCtrl) {
		var rotate = attrs.axisRotate;
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
	};
})
.directive('chartAxisX', function() {
	var axisLinker = function(scope,element,attrs,chartCtrl) {
		var position=attrs.axisPosition;
		var label=attrs.axisLabel;

		var axis={"label":{"text":label,"position":position}};

		var type=attrs.axisType;
		if (type) {
			axis.type=type;
		}
		var paddingLeft = attrs.paddingLeft;
		var paddingRight = attrs.paddingRight;
		if (paddingLeft || paddingRight) {
			paddingLeft = (paddingLeft) ? paddingLeft : 0;
			paddingRight = (paddingRight)? paddingRight : 0;
			axis.padding = {"left":parseInt(paddingLeft),"right":parseInt(paddingRight)};
		}
		if (attrs.show === 'false') {
			axis.show = false;
		}
		// TODO has a strange effect on the graph, need to evaluate
		var height = attrs.axisHeight;
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
	};
})
.directive('chartAxisY', function() {
	var axisLinker = function(scope,element,attrs,chartCtrl) {
		var id=attrs.axisId;
		var position=attrs.axisPosition;
		var label=attrs.axisLabel;

		id = ( id == undefined ? 'y' : id );

		var axis={"label":{"text":label,"position":position}};
		if (attrs.show === 'false') {
			axis.show=false;
		} else if (id === 'y2') {
			axis.show=true;
		}
		var paddingTop = attrs.paddingTop;
		var paddingBottom = attrs.paddingBottom;
		if (paddingTop || paddingBottom) {
			paddingTop = (paddingTop) ? paddingTop : 0;
			paddingBottom = (paddingBottom)? paddingBottom : 0;
			axis.padding = {"top":parseInt(paddingTop),"bottom":parseInt(paddingBottom)};
		}
		var rangeMax = attrs.rangeMax;
		var rangeMin = attrs.rangeMin;
		if (rangeMax) {
			axis.max = parseInt(rangeMax);
		}
		if (rangeMin) {
			axis.min = parseInt(rangeMin);
		}

		chartCtrl.addAxisProperties(id,axis);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": axisLinker
	};
})
.directive('chartGrid', function() {
	var gridLinker = function(scope,element,attrs,chartCtrl) {
		var showX = attrs.showX;
		if (showX && showX === "true") {
			chartCtrl.addGrid("x");
		}
		var showY = attrs.showY;
		if (showY && showY === "true") {
			chartCtrl.addGrid("y");
		}
		var showY2 = attrs.showY2;
		if (showY2 && showY2 === "true") {
			chartCtrl.addGrid("y2");
		}
		var showFocus = attrs.showFocus;
		if (showFocus && showFocus === "false") {
			chartCtrl.hideGridFocus();
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": gridLinker,
		"transclude": true,
		"template": "<div ng-transclude></div>"
	};
})
.directive('chartGridOptional', function() {
	var gridLinker = function(scope,element,attrs,chartCtrl) {
		var axisId = attrs.axisId;
		var value = attrs.gridValue;
		var text = attrs.gridText;

		chartCtrl.addGridLine(axisId,value,text);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": gridLinker
	};
})
.directive('chartAxisXTick', function() {
	var tickLinker = function(scope,element,attrs,chartCtrl) {
		var tick = {};

		var count = attrs.tickCount;
		if (count) {
			tick.count = count;
		}

		// TODO, dit lijkt nog niet echt iets te doen
		var format = attrs.tickFormat;
		if (format) {
			tick.format = format;
		}

		var culling = attrs.tickCulling;
		if (culling) {
      culling = angular.lowercase(culling);
      if (culling === 'true') {
        tick.culling = true;
      }
      else if (culling === 'false') {
        tick.culling = false;
      }
		}

		var rotate = attrs.tickRotate;
		if (rotate) {
			tick.rotate = rotate;
		}

		var fit = attrs.tickFit;
		if (fit) {
      fit = angular.lowercase(fit);
      if (fit === 'true') {
        tick.fit = true;
      }
      else if (fit === 'false') {
        tick.fit = false;
      }
		}

		chartCtrl.addXTick(tick);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": tickLinker
	};

})
.directive('chartAxisYTick', function() {
	var tickLinker = function(scope,element,attrs,chartCtrl) {
		var tick = {};

		var count = attrs.tickCount;
		if (count) {
			tick.count = count;
		}

		var format = attrs.tickFormat;
		if (format) {
			tick.format = d3.format(format);
		}

		chartCtrl.addYTick(tick);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": tickLinker
	};
})
.directive('chartLegend', function() {
	var legendLinker = function(scope,element,attrs,chartCtrl) {
		var legend = null;
		var show = attrs.showLegend;
		if (show && show === "false") {
			legend = {"show":false};
		} else {
			var position = attrs.legendPosition;
			if (position) {
				legend = {"position":position};
			}
		}

		if (legend != null) {
			chartCtrl.addLegend(legend);
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": legendLinker
	};

})
.directive('chartTooltip', function() {
	var tooltipLinker = function(scope,element,attrs,chartCtrl) {
		var tooltip = null;
		var show = attrs.showTooltip;
		if (show && show === "false") {
			tooltip = {"show":false};
		} else {
			var grouped = attrs.groupTooltip;
			if (grouped && grouped === "false") {
				tooltip = {"grouped":false};
			}
		}

		if (tooltip != null) {
			chartCtrl.addTooltip(tooltip);
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": tooltipLinker
	};

})
.directive('chartSize', function() {
	var sizeLinker = function(scope,element,attrs,chartCtrl) {
		var chartSize = null;
		var width = attrs.chartWidth;
		var height = attrs.chartHeight;
		if (width || height) {
			chartSize = {};
			if (width) {
				chartSize.width = parseInt(width);
			}
			if (height) {
				chartSize.height = parseInt(height);
			}
			chartCtrl.addSize(chartSize);
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": sizeLinker
	};

})
.directive('chartColors', function() {
	var colorsLinker = function(scope,element,attrs,chartCtrl) {
		var pattern = attrs.colorPattern;
		if (pattern) {
			chartCtrl.addColors(pattern.split(","));
		}

		if (attrs.colorFunction) {
			chartCtrl.addColorFunction(scope.colorFunction());
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {
			"colorFunction": "&"
		},
		"replace":true,
		"link": colorsLinker
	};
})
.directive('chartGroup', function() {
	var groupLinker = function(scope,element,attrs,chartCtrl) {
		var group = attrs.groupValues.split(",");
		chartCtrl.addGroup(group);
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": groupLinker
	};
})
.directive('chartGauge', function() {
	var gaugeLinker = function (scope, element, attrs, chartCtrl) {
		var gauge = {
			min: parseInt(attrs.min || '0'),
			max: parseInt(attrs.max || '100'),
			width: parseInt(attrs.width || '25'),
			units: attrs.units
		};

		chartCtrl.addGauge(gauge);
	};

	return {
		require: '^c3chart',
		restrict: 'E',
		scope: {},
		replace: true,
		link: gaugeLinker
	};
})
.directive('chartEvents', function() {
	var eventsLinker = function(scope,element,attrs,chartCtrl) {
		if (attrs.onInit) {
			chartCtrl.addOnInitFunction(scope.onInit);
		}
		if (attrs.onMouseover) {
			chartCtrl.addOnMouseoverFunction(scope.onMouseover);
		}
		if (attrs.onMouseout) {
			chartCtrl.addOnMouseoutFunction(scope.onMouseout);
		}
		if (attrs.onResize) {
			chartCtrl.addOnResizeFunction(scope.onResize);
		}
		if (attrs.onResized) {
			chartCtrl.addOnResizedFunction(scope.onResized);
		}
		if (attrs.onRendered) {
			chartCtrl.addOnRenderedFunction(scope.onRendered);
		}
		if (attrs.onClickData) {
			chartCtrl.addDataOnClickFunction(scope.onClickData);
		}
		if (attrs.onMouseoverData) {
			chartCtrl.addDataOnMouseoverFunction(scope.onMouseoverData);
		}
		if (attrs.onMouseoutData) {
			chartCtrl.addDataOnMouseoutFunction(scope.onMouseoutData);
		}
	};

	return {
		"require":"^c3chart",
		"restrict":"E",
		"scope": {
			"onInit": "&",
			"onMouseover": "&",
			"onMouseout": "&",
			"onResize": "&",
			"onResized": "&",
			"onRendered": "&",
			"onClickData": "&",
			"onMouseoverData": "&",
			"onMouseoutData": "&"
		},
		"replace":true,
		"link": eventsLinker
	};

});
