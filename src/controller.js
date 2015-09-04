/**
 * @name ChartController
 * @description Controller for the c3js directive
 */
angular.module('gridshore.c3js.chart')
	/**
	 * @controller 
	 */
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
            $scope.sorting = null;
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
            if ($scope.sorting != null) {
                if ($scope.sorting == "null") {
                    config.data.order = null;
                } else {
                    config.data.order = $scope.sorting;
                }
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
            if ($scope.yTickFormatFunction) {
                config.axis.y.tick        = config.axis.y.tick || {};
                config.axis.y.tick.format = $scope.yTickFormatFunction;
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

        this.addChartCallbackFunction = function(chartCallbackFunction) {
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

        this.addYTickFormatFunction = function (yTickFormatFunction) {
            $scope.yTickFormatFunction = yTickFormatFunction;
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

        this.addSorting = function (sorting) {
            $scope.sorting = sorting;
        }

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

            if (!$scope.chartIsGenerated) {
                $scope.chart = c3.generate($scope.config);
                $scope.chartIsGenerated = true;

                // Use the API as documented here to interact with the chart object
                // http://c3js.org/reference.html#api
                if ($scope.chartCallbackFunction) {
                    $scope.chartCallbackFunction($scope.chart);
                }
            } else {
                $scope.chart.load($scope.config.data);
            }
        }
    }]);