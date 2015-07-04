/*! c3-angular - v0.5.1 - 2015-06-22
* https://github.com/jettro/c3-angular-sample
* Copyright (c) 2015 ; Licensed  */
angular.module('gridshore.c3js.chart', [])
    .controller('ChartController', ['$scope', '$timeout', function ($scope, $timeout) {

        function resetVars() {
            $scope.chart = null;
            $scope.columns = [];
            $scope.types = {};
            $scope.axis = {};
            $scope.axes = {};
            $scope.padding = null;
            $scope.xValues = null;
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
        }

        resetVars();

        this.showGraph = function () {
            var config = {};
            config.bindto = "#" + $scope.bindto;
            config.data = {};

            if ($scope.xValues) {
                config.data.x = $scope.xValues;
            }
            if ($scope.xsValues) {
                config.data.xs = $scope.xsValues;
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
                config.data.labels = true;
            }
            if ($scope.dataLabelsFormatFunction) {
                config.data.labels        = config.data.labels || {};
                config.data.labels.format = $scope.dataLabelsFormatFunction;
            }
            if ($scope.groups != null) {
                config.data.groups = $scope.groups;
            }
            if ($scope.showSubchart && $scope.showSubchart === "true") {
                config.subchart = {"show": true};
            }
            if ($scope.enableZoom && $scope.enableZoom === "true") {
                config.zoom = {"enabled": true};
            }
            config.axis = $scope.axis;
            if ($scope.xTick) {
                config.axis.x.tick = $scope.xTick;
            }
            if ($scope.xTickFormatFunction) {
                config.axis.x.tick        = config.axis.x.tick || {};
                config.axis.x.tick.format = $scope.xTickFormatFunction;
            }

            if ($scope.xType) {
                config.axis.x.type = $scope.xType;
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
            } else {
                config.tooltip = {}
            }
            if ($scope.tooltipTitleFormatFunction) {
                config.tooltip.format       = config.tooltip.format || {};
                config.tooltip.format.title = $scope.tooltipTitleFormatFunction;
            }
            if ($scope.tooltipNameFormatFunction) {
                config.tooltip.format      = config.tooltip.format || {};
                config.tooltip.format.name = $scope.tooltipNameFormatFunction;
            }
            if ($scope.tooltipValueFormatFunction) {
                config.tooltip.format       = config.tooltip.format || {};
                config.tooltip.format.value = $scope.tooltipValueFormatFunction;
            }

            if ($scope.chartSize != null) {
                config.size = $scope.chartSize;
            }
            if ($scope.colors != null) {
                config.color = {"pattern": $scope.colors};
            }
            if ($scope.gauge != null) {
                config.gauge = $scope.gauge;
            } else {
                config.gauge = {}
            }
            if ($scope.gaugeLabelFormatFunction) {
                config.gauge.label = config.gauge.label || {};
                config.gauge.label.format = $scope.gaugeLabelFormatFunction;
            }            
            if ($scope.point != null) {
                config.point = $scope.point;
            }
            if ($scope.bar != null) {
                config.bar = $scope.bar;
            }
            if ($scope.pie != null) {
                config.pie = $scope.pie;
            }
            if ($scope.pieLabelFormatFunction) {
                config.pie.label = config.pie.label || {};
                config.pie.label.format = $scope.pieLabelFormatFunction;
            }            
            if ($scope.donut != null) {
                config.donut = $scope.donut;
            } else {
                config.donut = {}
            }
            if ($scope.donutLabelFormatFunction) {
                config.donut.label = config.donut.label || {};
                config.donut.label.format = $scope.donutLabelFormatFunction;
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
                config.data.onclick = function (data, element) {
                    $scope.$apply(function () {
                        $scope.dataOnClick({"data": data});
                    });
                };
            }
            if ($scope.dataOnMouseover != null) {
                config.data.onmouseover = function (data) {
                    $scope.$apply(function () {
                        $scope.dataOnMouseover({"data": data});
                    });
                };
            }
            if ($scope.dataOnMouseout != null) {
                config.data.onmouseout = function (data) {
                    $scope.$apply(function () {
                        $scope.dataOnMouseout({"data": data});
                    });
                };
            }

            $scope.config = config;

            if ($scope.chartData && $scope.chartColumns) {
                $scope.$watchCollection('chartData', function () {
                    loadChartData();
                });
            } else {
                $scope.chart = c3.generate($scope.config);

                // TODO make sure we make it once so it works for the other location as well
                if ($scope.chartCallbackFunction) {
                    $scope.chartCallbackFunction($scope.chart);
                }
            }

            $scope.$on('$destroy', function () {
                $timeout(function(){
                    if (angular.isDefined($scope.chart)) {
                        $scope.chart = $scope.chart.destroy();
                        resetVars();
                    }
                }, 10000)
            });
        };

        this.addColumn = function (column, columnType, columnName, columnColor) {
            $scope.columns.push(column);
            addColumnProperties(column[0], columnType, columnName, columnColor);
        };

        this.addDataLabelsFormatFunction = function (dataLabelsFormatFunction) {
            $scope.dataLabelsFormatFunction = dataLabelsFormatFunction;
        };

        this.addChartCallbackFunction = function (chartCallbackFunction) {
            $scope.chartCallbackFunction = chartCallbackFunction;
        };

        this.addYAxis = function (yAxis) {
            $scope.axes = yAxis;
            if (!$scope.axis.y2) {
                $scope.axis.y2 = {"show": true};
            }
        };

        this.addXAxisValues = function (xValues) {
            $scope.xValues = xValues;
        };

        this.addXSValues = function (xsValues) {
            $scope.xsValues = xsValues;
        };

        this.addAxisProperties = function (id, axis) {
            $scope.axis[id] = axis;
        };

        this.addXTick = function (tick) {
            $scope.xTick = tick;
        };
        this.addXTickFormatFunction = function (xTickFormatFunction) {
            $scope.xTickFormatFunction = xTickFormatFunction;
        };


        this.addXType = function (type) {
            $scope.xType = type;
        };

        this.addYTick = function (tick) {
            $scope.yTick = tick;
        };

        this.rotateAxis = function () {
            $scope.axis.rotated = true;
        };

        this.addPadding = function (side, amount) {
            if ($scope.padding == null) {
                $scope.padding = {};
            }
            $scope.padding[side] = parseInt(amount);
        };

        this.addGrid = function (axis) {
            if ($scope.grid == null) {
                $scope.grid = {};
            }
            if ($scope.grid[axis] == null) {
                $scope.grid[axis] = {};
            }
            $scope.grid[axis].show = true;
        };

        this.addGridLine = function (axis, value, text) {
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
                $scope.grid.y.lines.push({"value": value, "text": text, "axis": "y2"});
            } else {
                $scope.grid[axis].lines.push({"value": value, "text": text});
            }
        };

        this.addLegend = function (legend) {
            $scope.legend = legend;
        };

        this.addTooltip = function (tooltip) {
            $scope.tooltip = tooltip;
        };
        this.addTooltipTitleFormatFunction = function (tooltipTitleFormatFunction) {
            $scope.tooltipTitleFormatFunction = tooltipTitleFormatFunction;
        };
        this.addTooltipNameFormatFunction = function (tooltipNameFormatFunction) {
            $scope.tooltipNameFormatFunction = tooltipNameFormatFunction;
        };
        this.addTooltipValueFormatFunction = function (tooltipValueFormatFunction) {
            $scope.tooltipValueFormatFunction = tooltipValueFormatFunction;
        };

        this.addSize = function (chartSize) {
            $scope.chartSize = chartSize;
        };

        this.addColors = function (colors) {
            $scope.colors = colors;
        };

        this.addColorFunction = function (colorFunction) {
            $scope.colorFunction = colorFunction;
        };

        this.addOnInitFunction = function (onInitFunction) {
            $scope.onInit = onInitFunction;
        };

        this.addOnMouseoverFunction = function (onMouseoverFunction) {
            $scope.onMouseover = onMouseoverFunction;
        };

        this.addOnMouseoutFunction = function (onMouseoutFunction) {
            $scope.onMouseout = onMouseoutFunction;
        };

        this.addOnRenderedFunction = function (onRederedFunction) {
            $scope.onRendered = onRederedFunction;
        };

        this.addOnResizeFunction = function (onResizeFunction) {
            $scope.onResize = onResizeFunction;
        };

        this.addOnResizedFunction = function (onResizedFuncton) {
            $scope.onResized = onResizedFuncton;
        };

        this.addDataOnClickFunction = function (theFunction) {
            $scope.dataOnClick = theFunction;
        };

        this.addDataOnMouseoverFunction = function (theFunction) {
            $scope.dataOnMouseover = theFunction;
        };

        this.addDataOnMouseoutFunction = function (theFunction) {
            $scope.dataOnMouseout = theFunction;
        };

        this.addGauge = function (gauge) {
            $scope.gauge = gauge;
        };

        this.addGaugeLabelFormatFunction = function (gaugeLabelFormatFunction) {
            $scope.gaugeLabelFormatFunction = gaugeLabelFormatFunction;
        };

        this.addBar = function (bar) {
            $scope.bar = bar;
        };

        this.addPie = function (pie) {
            $scope.pie = pie;
        };

        this.addPieLabelFormatFunction = function (pieLabelFormatFunction) {
            $scope.pieLabelFormatFunction = pieLabelFormatFunction;
        };

        this.addDonut = function (donut) {
            $scope.donut = donut;
        };

        this.addDonutLabelFormatFunction = function (donutLabelFormatFunction) {
            $scope.donutLabelFormatFunction = donutLabelFormatFunction;
        };

        this.addGroup = function (group) {
            if ($scope.groups == null) {
                $scope.groups = [];
            }
            $scope.groups.push(group);
        };

        this.addPoint = function(point) {
            $scope.point = point;
        };

        this.hideGridFocus = function () {
            if ($scope.grid == null) {
                $scope.grid = {};
            }
            $scope.grid["focus"] = {"show": false};
        };

        function addColumnProperties(id, columnType, columnName, columnColor) {
            if (columnType !== undefined) {
                $scope.types[id] = columnType;
            }
            if (columnName !== undefined) {
                if ($scope.names === null) {
                    $scope.names = {};
                }
                $scope.names[id] = columnName;
            }
            if (columnColor !== undefined) {
                if ($scope.colors === null) {
                    $scope.colors = {};
                }
                $scope.colors[id] = columnColor;
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

            if ($scope.chartCallbackFunction) {
                $scope.chartCallbackFunction($scope.chart);
            }
            if (!$scope.chartIsGenerated) {
                $scope.chart = c3.generate($scope.config);
                $scope.chartIsGenerated = true;
            } else {
                $scope.chart.load($scope.config.data);
            }
        }
    }])
    .directive('c3chart', ['$timeout', function ($timeout) {
        var chartLinker = function (scope, element, attrs, chartCtrl) {
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
            if (attrs.labelsFormatFunction) {
                chartCtrl.addDataLabelsFormatFunction(scope.labelsFormatFunction());
            }

            if (attrs.chartCallbackFunction) {
                chartCtrl.addChartCallbackFunction(scope.chartCallbackFunction());
            }

            // Trick to wait for all rendering of the DOM to be finished.
            $timeout(function () {
                chartCtrl.showGraph();
            });
        };

        return {
            "restrict": "E",
            "controller": "ChartController",
            "scope": {
                "bindto": "@bindtoId",
                "showLabels": "@showLabels",
                "labelsFormatFunction": "&",
                "showSubchart": "@showSubchart",
                "enableZoom": "@enableZoom",
                "chartData": "=chartData",
                "chartColumns": "=chartColumns",
                "chartX": "=chartX",
                "chartCallbackFunction": "&"
            },
            "template": "<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
            "replace": true,
            "transclude": true,
            "link": chartLinker
        };
    }])
    .directive('chartColumn', function () {
        var columnLinker = function (scope, element, attrs, chartCtrl) {
            var column = attrs.columnValues.split(",");
            column.unshift(attrs.columnId);
            chartCtrl.addColumn(column, attrs.columnType, attrs.columnName, attrs.columnColor);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": columnLinker
        };
    })
    .directive('chartAxes', function () {
        var axesLinker = function (scope, element, attrs, chartCtrl) {
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
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": axesLinker
        };
    })
    .directive('chartAxis', function () {
        var axisLinker = function (scope, element, attrs, chartCtrl) {
            var rotate = attrs.axisRotate;
            if (rotate) {
                chartCtrl.rotateAxis();
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "transclude": true,
            "template": "<div ng-transclude></div>",
            "replace": true,
            "link": axisLinker
        };
    })
    .directive('chartAxisX', function () {
        var axisLinker = function (scope, element, attrs, chartCtrl) {
            var position = attrs.axisPosition;
            var label = attrs.axisLabel;

            var axis = {"label": {"text": label, "position": position}};

            var type = attrs.axisType;
            if (type) {
                axis.type = type;
            }
            var paddingLeft = attrs.paddingLeft;
            var paddingRight = attrs.paddingRight;
            if (paddingLeft || paddingRight) {
                paddingLeft = (paddingLeft) ? paddingLeft : 0;
                paddingRight = (paddingRight) ? paddingRight : 0;
                axis.padding = {"left": parseInt(paddingLeft), "right": parseInt(paddingRight)};
            }
            if (attrs.show === 'false') {
                axis.show = false;
            }
            if (attrs.axisLocaltime === 'true') {
                axis.localtime=true;
            }
            var max=attrs.axisMax;
            if (max) {
                axis.max=max;
            }
            var min=attrs.axisMin;
            if (min) {
                axis.min=min;
            }
            var type=attrs.axisType;
            if (type) {
                axis.type=type;   
            }
            chartCtrl.addAxisProperties('x', axis);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "transclude": true,
            "template": "<div ng-transclude></div>",
            "replace": true,
            "link": axisLinker
        };
    })
    .directive('chartAxisY', function () {
        var axisLinker = function (scope, element, attrs, chartCtrl) {
            var id = attrs.axisId;
            var position = attrs.axisPosition;
            var label = attrs.axisLabel;

            id = ( id == undefined ? 'y' : id );

            var axis = {"label": {"text": label, "position": position}};
            if (attrs.show === 'false') {
                axis.show = false;
            } else if (id === 'y2') {
                axis.show = true;
            }
            var paddingTop = attrs.paddingTop;
            var paddingBottom = attrs.paddingBottom;
            if (paddingTop || paddingBottom) {
                paddingTop = (paddingTop) ? paddingTop : 0;
                paddingBottom = (paddingBottom) ? paddingBottom : 0;
                axis.padding = {"top": parseInt(paddingTop), "bottom": parseInt(paddingBottom)};
            }
            var axisMax = attrs.axisMax;
            var axisMin = attrs.axisMin;
            if (axisMax) {
                axis.max = parseInt(axisMax);
            }
            if (axisMin) {
                axis.min = parseInt(axisMin);
            }
            if (attrs.axisInverted === 'true') {
                axis.inverted=true;
            }

            chartCtrl.addAxisProperties(id, axis);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": axisLinker
        };
    })
    .directive('chartGrid', function () {
        var gridLinker = function (scope, element, attrs, chartCtrl) {
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
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": gridLinker,
            "transclude": true,
            "template": "<div ng-transclude></div>"
        };
    })
    .directive('chartGridOptional', function () {
        var gridLinker = function (scope, element, attrs, chartCtrl) {
            var axisId = attrs.axisId;
            var value = attrs.gridValue;
            var text = attrs.gridText;

            chartCtrl.addGridLine(axisId, value, text);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": gridLinker
        };
    })
    .directive('chartAxisXTick', function () {
        var tickLinker = function (scope, element, attrs, chartCtrl) {
            var tick = {};

            var count = attrs.tickCount;
            if (count) {
                tick.count = count;
            }

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

            var cullingMax = attrs.tickCullingMax;
            if (cullingMax) {
                tick.culling = { max: parseInt(cullingMax) }
            }

            var multiline = attrs.tickMultiline;
            if (multiline) {
                multiline = angular.lowercase(multiline);
                if (multiline === 'true') {
                    tick.multiline = true;
                }
                else if (multiline === 'false') {
                    tick.multiline = false;
                }
            }

            var centered = attrs.tickCentered;
            if (centered) {
                centered = angular.lowercase(centered);
                if (centered === 'true') {
                    tick.centered = true;
                }
                else if (centered === 'false') {
                    tick.centered = false;
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

            if (attrs.tickFormatFunction) {
                chartCtrl.addXTickFormatFunction(scope.tickFormatFunction());
            }

        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {
                "tickFormatFunction": "&"
            },
            "replace": true,
            "link": tickLinker
        };

    })
    .directive('chartAxisYTick', function () {
        var tickLinker = function (scope, element, attrs, chartCtrl) {
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
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": tickLinker
        };
    })
    .directive('chartLegend', function () {
        var legendLinker = function (scope, element, attrs, chartCtrl) {
            var legend = null;
            var show = attrs.showLegend;
            if (show && show === "false") {
                legend = {"show": false};
            } else {
                var position = attrs.legendPosition;
                if (position) {
                    legend = {"position": position};
                }
                var inset = attrs.legendInset;
                if (inset) {
                    legend = {"position":"inset","inset":{"anchor":inset}};
                }
            }

            if (legend != null) {
                chartCtrl.addLegend(legend);
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": legendLinker
        };

    })
    .directive('chartTooltip', function () {
        var tooltipLinker = function (scope, element, attrs, chartCtrl) {
            var tooltip = null;
            var show      = attrs.showTooltip;
            var hideTitle = attrs.hideTooltipTitle;
            var joined    = attrs.joinedTooltip;

            if (show && show === "false") {
                tooltip = {"show": false};
            } else {
                var grouped = attrs.groupTooltip;
                if (grouped && grouped === "false") {
                    tooltip = {"grouped": false};
                }
            }

            if (joined && joined === "true") {
                tooltip = tooltip || {};
                tooltip.contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
                    var $$ = this, config = $$.config,
                        titleFormat = config.tooltip_format_title || defaultTitleFormat,
                        nameFormat  = config.tooltip_format_name || function (name) { return name; },
                        valueFormat = config.tooltip_format_value || defaultValueFormat,
                        text, i, title, value, name, bgcolor, CLASS;
                    CLASS = {
                        tooltipContainer: 'c3-tooltip-container',
                        tooltip         : 'c3-tooltip',
                        tooltipName     : 'c3-tooltip-name'
                    };
                    for (i = d[0].x; i < (d[0].x + 1); i++) {
                        if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                        if (! text) {
                            title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                            text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                        }

                        value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                        if (value !== undefined) {
                            name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);
                            bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                            text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                            text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                            text += "<td class='value'>" + value + "</td>";
                            text += "</tr>";
                        }
                    }
                    return text + "</table>";
                }
            }

            if (tooltip != null) {
                chartCtrl.addTooltip(tooltip);
            }
            if (attrs.titleFormatFunction) {
                chartCtrl.addTooltipTitleFormatFunction(scope.titleFormatFunction());
            }
            if (attrs.nameFormatFunction) {
                chartCtrl.addTooltipNameFormatFunction(scope.nameFormatFunction());
            }
            if (attrs.valueFormatFunction) {
                chartCtrl.addTooltipValueFormatFunction(scope.valueFormatFunction());
            }

        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {
                "valueFormatFunction": '&',
                "nameFormatFunction" : "&",
                "titleFormatFunction": "&"
            },
            "replace": true,
            "link": tooltipLinker
        };

    })
    .directive('chartSize', function () {
        var sizeLinker = function (scope, element, attrs, chartCtrl) {
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
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": sizeLinker
        };

    })
    .directive('chartColors', function () {
        var colorsLinker = function (scope, element, attrs, chartCtrl) {
            var pattern = attrs.colorPattern;
            if (pattern) {
                chartCtrl.addColors(pattern.split(","));
            }

            if (attrs.colorFunction) {
                chartCtrl.addColorFunction(scope.colorFunction());
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {
                "colorFunction": "&"
            },
            "replace": true,
            "link": colorsLinker
        };
    })
    .directive('chartGroup', function () {
        var groupLinker = function (scope, element, attrs, chartCtrl) {
            var group = attrs.groupValues.split(",");
            chartCtrl.addGroup(group);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": groupLinker
        };
    })
    .directive('chartGauge', function () {
        var gaugeLinker = function (scope, element, attrs, chartCtrl) {
            var gauge = {};
            if (attrs.min) {
                gauge.min = parseInt(attrs.min);
            }
            if (attrs.max) {
                gauge.max = parseInt(attrs.max);
            }
            if (attrs.width) {
                gauge.width = parseInt(attrs.width);
            }
            if (attrs.units) {
                gauge.units = attrs.units
            }
            if (attrs.showLabel) {
                gauge.label = {"show": (attrs.showLabel === 'true')};
            }
            if (attrs.expand) {
                gauge.expand = (attrs.expand === 'true');
            }
            chartCtrl.addGauge(gauge);
            if (attrs.labelFormatFunction) {
                chartCtrl.addGaugeLabelFormatFunction(scope.labelFormatFunction());
            }
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {
                'labelFormatFunction': "&"
            },
            replace: true,
            link: gaugeLinker
        };
    })
    .directive('chartPoints', function () {
        var pointLinker = function (scope, element, attrs, chartCtrl) {
            var point = {};
            if (attrs.showPoint) {
                point.show =  (attrs.showPoint === 'true');
            }
            if (attrs.pointExpandEnabled) {
                if (!point.focus) {
                    point.focus = {"expand":{}};
                }
                point.focus.expand.enabled = (attrs.pointsFocusEnabled !== 'false');
            }
            if (attrs.pointExpandRadius) {
                if (!point.focus) {
                    pie.focus = {"expand":{}};
                }
                point.focus.expand.r = parseInt(attrs.pointFocusRadius);
            }
            if (attrs.pointRadius) {
                point.r = parseInt(attrs.pointRadius);
            }
            if (attrs.pointSelectRadius) {
                point.select = {"r":parseInt(attrs.pointSelectRadius)};
            }
            chartCtrl.addPoint(point);
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {},
            replace: true,
            link: pointLinker
        };
    })
    .directive('chartPie', function () {
        var pieLinker = function (scope, element, attrs, chartCtrl) {
            var pie = {};
            if (attrs.showLabel) {
                pie.label = {"show": (attrs.showLabel === 'true')};
            }
            if (attrs.thresholdLabel) {
                if (!pie.label) {
                    pie.label = {};
                }
                pie.label.threshold = parseFloat(attrs.thresholdLabel);
            }
            if (attrs.expand) {
                pie.expand = (attrs.expand === 'true');
            }
            chartCtrl.addPie(pie);
            if (attrs.labelFormatFunction) {
                chartCtrl.addPieLabelFormatFunction(scope.labelFormatFunction());
            }
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {
                "labelFormatFunction": "&"
            },
            replace: true,
            link: pieLinker
        };
    })
    .directive('chartDonut', function () {
        var donutLinker = function (scope, element, attrs, chartCtrl) {
            var donut = {};
            if (attrs.showLabel) {
                donut.label = {"show": (attrs.showLabel === 'true')};
            }
            if (attrs.thresholdLabel) {
                if (!donut.label) {
                    donut.label = {};
                }
                donut.label.threshold = parseFloat(attrs.thresholdLabel);
            }
            if (attrs.expand) {
                donut.expand = (attrs.expand === 'true');
            }
            if (attrs.width) {
                donut.width = parseInt(attrs.width);
            }
            if (attrs.title) {
                donut.title = attrs.title;
            }
            chartCtrl.addDonut(donut);
            if (attrs.labelFormatFunction) {
                chartCtrl.addDonutLabelFormatFunction(scope.labelFormatFunction());
            }
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {
                "labelFormatFunction": "&"
            },
            replace: true,
            link: donutLinker
        };
    })
    .directive('chartBar', function () {
        var barLinker = function (scope, element, attrs, chartCtrl) {
            var bar = {};
            if (attrs.width) {
                bar.width = parseInt(attrs.width);
            }
            if (attrs.ratio) {
                if (!bar.width) {
                    bar.width = {};
                }
                bar.width.ratio = parseFloat(attrs.ratio);
            }
            if (attrs.zerobased) {
                bar.zerobased = (attrs.zerobased === 'true');
            }
            chartCtrl.addBar(bar);
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {},
            replace: true,
            link: barLinker
        };
    })
    .directive('chartEvents', function () {
        var eventsLinker = function (scope, element, attrs, chartCtrl) {
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
            "require": "^c3chart",
            "restrict": "E",
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
            "replace": true,
            "link": eventsLinker
        };

    });