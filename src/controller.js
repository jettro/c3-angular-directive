/**
 * @name ChartController
 * @description Controller for the c3js directive
 */
angular.module('gridshore.c3js.chart')
/**
 * @controller
 */
    .controller('ChartController', ChartController);

ChartController.$inject = ['$scope', '$timeout'];
function ChartController($scope, $timeout) {
    this.showGraph = showGraph;

    this.addColumn = addColumn;
    this.addAxisProperties = addAxisProperties;
    this.rotateAxis = rotateAxis;
    this.addPadding = addPadding;
    this.addSorting = addSorting;
    this.addInteractionEnabled = addInteractionEnabled;
    this.addSize = addSize;
    this.addEmptyLabel = addEmptyLabel;

    this.addColorPatterns = addColorPatterns;
    this.addColorThresholds = addColorThresholds;
    this.addColorFunction = addColorFunction;

    this.addGrid = addGrid;
    this.addGridLine = addGridLine;
    this.hideGridFocus = hideGridFocus;

    this.addLegend = addLegend;

    this.addTooltip = addTooltip;
    this.addTooltipTitleFormatFunction = addTooltipTitleFormatFunction;
    this.addTooltipNameFormatFunction = addTooltipNameFormatFunction;
    this.addTooltipValueFormatFunction = addTooltipValueFormatFunction;
    this.addTooltipContentFormatFunction = addTooltipContentFormatFunction;

    this.addYAxis = addYAxis;
    this.addYTick = addYTick;
    this.addYTickFormatFunction = addYTickFormatFunction;

    this.addXAxisValues = addXAxisValues;
    this.addXTick = addXTick;
    this.addXTickFormatFunction = addXTickFormatFunction;
    this.addXType = addXType;
    this.addXSValues = addXSValues;

    this.addChartCallbackFunction = addChartCallbackFunction;
    this.addInitialConfig = addInitialConfig;

    this.addDataLabelsFormatFunction = addDataLabelsFormatFunction;
    this.addTransitionDuration = addTransitionDuration;
    
    this.addSubchartOnBrushFunction = addSubchartOnBrushFunction;    
    this.addOnZoomEndFunction = addOnZoomEndFunction;    

    this.addGauge = addGauge;
    this.addGaugeLabelFormatFunction = addGaugeLabelFormatFunction;

    this.addBar = addBar;

    this.addLine = addLine;

    this.addRegion = addRegion;

    this.addPie = addPie;
    this.addPieLabelFormatFunction = addPieLabelFormatFunction;

    this.addDonut = addDonut;
    this.addDonutLabelFormatFunction = addDonutLabelFormatFunction;

    this.addGroup = addGroup;

    this.addPoint = addPoint;

    this.addOnInitFunction = addOnInitFunction;
    this.addOnMouseoverFunction = addOnMouseoverFunction;
    this.addOnMouseoutFunction = addOnMouseoutFunction;
    this.addOnRenderedFunction = addOnRenderedFunction;
    this.addOnResizeFunction = addOnResizeFunction;
    this.addOnResizedFunction = addOnResizedFunction;
    this.addDataOnClickFunction = addDataOnClickFunction;
    this.addDataOnMouseoverFunction = addDataOnMouseoverFunction;
    this.addDataOnMouseoutFunction = addDataOnMouseoutFunction;

    this.setXFormat = setXFormat;

    this.addSelection = addSelection;

    resetVars();

    function resetVars() {
        $scope.chart = null;
        $scope.columns = [];
        $scope.types = {};
        $scope.regions = {};
        $scope.axis = {};
        $scope.axes = {};
        $scope.padding = null;
        $scope.emptyLabel = null;
        $scope.xValues = null;
        $scope.xFormat = null;
        $scope.xsValues = null;
        $scope.xTick = null;
        $scope.yTick = null;
        $scope.names = null;
        $scope.grid = null;
        $scope.legend = null;
        $scope.tooltip = null;
        $scope.chartSize = null;
        $scope.colors = null;
        $scope.colorThresholds = null;
        $scope.gauge = null;
        $scope.jsonKeys = null;
        $scope.groups = null;
        $scope.sorting = null;
        $scope.transitionDuration = null;
        $scope.initialConfig = null;
        $scope.selection = null;
    }

    function showGraph() {
        var config = {};
        if ($scope.initialConfig) {
            config = $scope.initialConfig;
        }
        config.bindto = "#" + $scope.bindto;
        config.data = config.data || {};

        if ($scope.xValues) {
            config.data.x = $scope.xValues;
        }
        if ($scope.xsValues) {
            config.data.xs = $scope.xsValues;
        }
        if ($scope.columns) {
            config.data.columns = $scope.columns;
        }
        if ($scope.xFormat) {
            config.data.xFormat = $scope.xFormat;
        }
        config.data.types = config.data.types || $scope.types;
        config.data.axes = config.data.axes || $scope.axes;
        if ($scope.names) {
            config.data.names = $scope.names;
        }
        if ($scope.emptyLabel != null) {
            config.data.empty = {
                label: {
                    text: $scope.emptyLabel
                }
            }
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
        if ($scope.transitionDuration != null) {
            config.transition = config.transition || {};
            config.transition.duration = $scope.transitionDuration;
        }
        if ($scope.showLabels && $scope.showLabels === "true") {
            config.data.labels = true;
        }
        if ($scope.dataLabelsFormatFunction) {
            config.data.labels = config.data.labels || {};
            config.data.labels.format = $scope.dataLabelsFormatFunction;
        }
        if ($scope.groups != null) {
            config.data.groups = $scope.groups;
        }
        if ($scope.showSubchart && $scope.showSubchart === "true") {
            config.subchart = {"show": true};
        }
        if ($scope.subchartOnBrushFunction){
            config.subchart = config.subchart || {};
            config.subchart.onbrush = $scope.subchartOnBrushFunction;
        }           
        if ($scope.enableZoom && $scope.enableZoom === "true") {
            config.zoom = {"enabled": true};
        }
        if ($scope.rescaleZoom && $scope.rescaleZoom === "true") {
            config.zoom = config.zoom || {};
            config.zoom.rescale = true;
        }
        if ($scope.onZoomEndFunction){
            config.zoom = config.zoom || {};
            config.zoom.onzoomend = $scope.onZoomEndFunction;
        }          
        config.axis = config.axis || $scope.axis;
        if ($scope.xTick) {
            config.axis.x.tick = $scope.xTick;
        }
        if ($scope.xTickFormatFunction) {
            config.axis.x.tick = config.axis.x.tick || {};
            config.axis.x.tick.format = $scope.xTickFormatFunction;
        }

        if ($scope.xType) {
            config.axis.x.type = $scope.xType;
        }
        if ($scope.yTick) {
            config.axis.y.tick = $scope.yTick;
        }
        if ($scope.yTickFormatFunction) {
            config.axis.y.tick = config.axis.y.tick || {};
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
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.title = $scope.tooltipTitleFormatFunction;
        }
        if ($scope.tooltipNameFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.name = $scope.tooltipNameFormatFunction;
        }
        if ($scope.tooltipValueFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.value = $scope.tooltipValueFormatFunction;
        }

        if ($scope.tooltipContentFormatFunction) {
            config.tooltip.contents = $scope.tooltipContentFormatFunction;
        }

        if ($scope.chartSize != null) {
            config.size = $scope.chartSize;
        }

        if ($scope.colors != null) {
            // Colors per data column shoule be specified in $scope.colors
            config.data.colors = $scope.colors;
        }

        if ($scope.colorFunction) {
            config.data.color = $scope.colorFunction;
        }

        if ($scope.colorPatterns != null) {
            // The colorPatters should contain an array with color patterns
            if (config.color === undefined) {
                config.color = {};
            }
            config.color.pattern = $scope.colorPatterns;
        }

        if ($scope.colorThresholds != null) {
            if (config.color === undefined) {
                config.color = {};
            }
            config.color.threshold = {"values": $scope.colorThresholds};
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
        if ($scope.line != null) {
            config.line = $scope.line;
        }
        if ($scope.regions != null) {
            config.data.regions = $scope.regions;
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
        if ($scope.selection != null) {
            config.data.selection = $scope.selection;
        }
        
        if (typeof $scope.interactionEnabled === 'boolean') {
            config.interaction = {
              enabled: $scope.interactionEnabled
            };
        }

        $scope.config = config;

        if ($scope.chartData && $scope.chartColumns) {
            $scope.$watch('chartData', function () {
                loadChartData();
            }, true);
        } else {
            $scope.chart = c3.generate($scope.config);
            if ($scope.chartCallbackFunction) {
                $scope.chartCallbackFunction($scope.chart);
            }
        }

        $scope.$on('$destroy', function () {
            $timeout(function () {
                if (angular.isDefined($scope.chart)) {
                    $scope.chart = $scope.chart.destroy();
                    resetVars();
                }
            }, 10000)
        });
    }

    function addColumn(column, columnType, columnName, columnColor) {
        $scope.columns.push(column);
        addColumnProperties(column[0], columnType, columnName, columnColor);
    }

    function addYAxis(yAxis) {
        $scope.axes = yAxis;
        if (!$scope.axis.y2) {
            $scope.axis.y2 = {"show": true};
        }
    }

    function addDataLabelsFormatFunction(dataLabelsFormatFunction) {
        $scope.dataLabelsFormatFunction = dataLabelsFormatFunction;
    }
    
    function addSubchartOnBrushFunction(subchartOnBrushFunction) {
        $scope.subchartOnBrushFunction = subchartOnBrushFunction;
    }
    
    function addOnZoomEndFunction(onZoomEndFunction) {
        $scope.onZoomEndFunction = onZoomEndFunction;
    }    

    function addChartCallbackFunction(chartCallbackFunction) {
        $scope.chartCallbackFunction = chartCallbackFunction;
    }

    function addTransitionDuration(transitionDuration) {
        $scope.transitionDuration = transitionDuration;
    }

    function addXAxisValues(xValues) {
        $scope.xValues = xValues;
    }

    function addXSValues(xsValues) {
        $scope.xsValues = xsValues;
    }

    function addAxisProperties(id, axis) {
        $scope.axis[id] = axis;
    }

    function addXTick(tick) {
        $scope.xTick = tick;
    }

    function addXTickFormatFunction(xTickFormatFunction) {
        $scope.xTickFormatFunction = xTickFormatFunction;
    }

    function addXType(type) {
        $scope.xType = type;
    }

    function addYTick(tick) {
        $scope.yTick = tick;
    }

    function addYTickFormatFunction(yTickFormatFunction) {
        $scope.yTickFormatFunction = yTickFormatFunction;
    }

    function rotateAxis() {
        $scope.axis.rotated = true;
    }

    function addEmptyLabel(text) {
        $scope.emptyLabel = text;
    }

    function addPadding(side, amount) {
        if ($scope.padding == null) {
            $scope.padding = {};
        }
        $scope.padding[side] = parseInt(amount);
    }

    function addSorting(sorting) {
        $scope.sorting = sorting;
    }

    function addInteractionEnabled(interactionEnabled) {
        $scope.interactionEnabled = interactionEnabled;
    }

    function addGrid(axis) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if ($scope.grid[axis] == null) {
            $scope.grid[axis] = {};
        }
        $scope.grid[axis].show = true;
    }

    function addGridLine(axis, value, text, gridClass, position) {
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
        var theGridLine = {};
        theGridLine.value = isNaN(+value) ? value : +value;
        theGridLine.text = text;
        if (gridClass) {
            theGridLine.class = gridClass;
        }
        if (position) {
            theGridLine.position = position;
        }
        if (axis === "y2") {
            theGridLine.axis = "y2";
            $scope.grid.y.lines.push(theGridLine);
        } else {
            $scope.grid[axis].lines.push(theGridLine);
        }
    }

    function addLegend(legend) {
        $scope.legend = legend;
    }

    function addTooltip(tooltip) {
        $scope.tooltip = tooltip;
    }

    function addTooltipTitleFormatFunction(tooltipTitleFormatFunction) {
        $scope.tooltipTitleFormatFunction = tooltipTitleFormatFunction;
    }

    function addTooltipNameFormatFunction(tooltipNameFormatFunction) {
        $scope.tooltipNameFormatFunction = tooltipNameFormatFunction;
    }

    function addTooltipValueFormatFunction(tooltipValueFormatFunction) {
        $scope.tooltipValueFormatFunction = tooltipValueFormatFunction;
    }

    function addTooltipContentFormatFunction(tooltipContentFormatFunction) {
        $scope.tooltipContentFormatFunction = tooltipContentFormatFunction;
    }

    function addSize(chartSize) {
        $scope.chartSize = chartSize;
    }

    function addColorPatterns(colors) {
        $scope.colorPatterns = colors;
    }

    function addColorThresholds(thresholds) {
        $scope.colorThresholds = thresholds;
        if ($scope.colors) {
            $scope.colors.threshold = {
                "values": $scope.colorThresholds
            }
        }
    }

    function addColorFunction(colorFunction) {
        $scope.colorFunction = colorFunction;
    }

    function addOnInitFunction(onInitFunction) {
        $scope.onInit = onInitFunction;
    }

    function addOnMouseoverFunction(onMouseoverFunction) {
        $scope.onMouseover = onMouseoverFunction;
    }

    function addOnMouseoutFunction(onMouseoutFunction) {
        $scope.onMouseout = onMouseoutFunction;
    }

    function addOnRenderedFunction(onRederedFunction) {
        $scope.onRendered = onRederedFunction;
    }

    function addOnResizeFunction(onResizeFunction) {
        $scope.onResize = onResizeFunction;
    }

    function addOnResizedFunction(onResizedFuncton) {
        $scope.onResized = onResizedFuncton;
    }

    function addDataOnClickFunction(theFunction) {
        $scope.dataOnClick = theFunction;
    }

    function addDataOnMouseoverFunction(theFunction) {
        $scope.dataOnMouseover = theFunction;
    }

    function addDataOnMouseoutFunction(theFunction) {
        $scope.dataOnMouseout = theFunction;
    }

    function addGauge(gauge) {
        $scope.gauge = gauge;
    }

    function addGaugeLabelFormatFunction(gaugeLabelFormatFunction) {
        $scope.gaugeLabelFormatFunction = gaugeLabelFormatFunction;
    }

    function addBar(bar) {
        $scope.bar = bar;
    }

    function addLine(line) {
        $scope.line = line;
    }

    function addRegion(id, intervals) {
        $scope.regions[id] = intervals;
    }

    function addPie(pie) {
        $scope.pie = pie;
    }

    function addPieLabelFormatFunction(pieLabelFormatFunction) {
        $scope.pieLabelFormatFunction = pieLabelFormatFunction;
    }

    function addDonut(donut) {
        $scope.donut = donut;
    }

    function addDonutLabelFormatFunction(donutLabelFormatFunction) {
        $scope.donutLabelFormatFunction = donutLabelFormatFunction;
    }

    function addGroup(group) {
        if ($scope.groups == null) {
            $scope.groups = [];
        }
        $scope.groups.push(group);
    }

    function addPoint(point) {
        $scope.point = point;
    }

    function hideGridFocus() {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        $scope.grid["focus"] = {"show": false};
    }

    function setXFormat(xFormat) {
        $scope.xFormat = xFormat;
    }

    function addInitialConfig(initialConfig) {
        $scope.initialConfig = initialConfig;
    }

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

    function addSelection(selection) {
        $scope.selection = selection;
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
            $scope.config.data.unload = true;
            $scope.chart.load($scope.config.data);
        }
    }
}