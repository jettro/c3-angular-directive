angular.module('gridshore.c3js.chart')
    .directive('c3chart', ['$timeout', function(timeout) {
        return C3Chart(timeout);
    }]);

/**
 * @ngdoc directive
 * @name C3Chart
 * @description
 *   `c3chart` is the main directive to create the chart. Use it to set the padding properties and include the other directives. You can also register the callback in this directive that receives the initialised chart object.
 *
 *   When using multiple charts in the same page you need to provide unique bind-id parameters.
 * 
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   -
 *
 * @param {Number} padding-top Set the top padding of the chart.
 *   
 *   {@link http://c3js.org/reference.html#padding-top| c3js doc}
 * 
 * @param {Number} padding-bottom Set the bottom padding of the chart.
 *
 *   {@link http://c3js.org/reference.html#padding-bottom| c3js doc}
 *
 * @param {Number} padding-right Set the right padding of the chart.
 * 
 *   {@link http://c3js.org/reference.html#padding-right| c3js doc}
 *
 * @param {Number} padding-left Set the left padding of the chart.
 * 
 *   {@link http://c3js.org/reference.html#padding-left| c3js doc}
 *
 * @param {String} empty-label Set text displayed when empty data.
 *
 *   {@link http://c3js.org/reference.html#data-empty-label-text| c3js doc}
 *
 * @param {String} bind-id Id of the chart, needs to be unique when using multiple charts on one page.
 * 
 *   {@link http://c3js.org/reference.html#bindto| c3js doc}
 *
 * @param {String} sort-data You can enter three different versions: asc, desc, null. Using this sorting you can change the order of stacking and the order of the pieces of a pie or donut.
 * 
 *   {@link http://c3js.org/reference.html#data-order| c3js doc}
 *
 * @param {Boolean} show-labels Configure to show the labels 'true' or not, default is false.
 * 
 *   {@link http://c3js.org/reference.html#data-labels| c3js doc}
 *
 * @param {Function} labels-format-function Provide a function to format the labels.
 * 
 *   {@link http://c3js.org/reference.html#data-labels-format| c3js doc}
 *
 * @param {Boolean} show-subchart Configure to show the subchart or not (default).
 * 
 *   {@link http://c3js.org/reference.html#subchart-show| c3js doc}
 *
 * @param {Function} subchart-on-brush-function Use this if you want to do something after brush on subchart
 * 
 *   {@link http://c3js.org/reference.html#subchart-onbrush| c3js doc}
 *
 * @param {Boolean} enable-zoom Configure to enable zoom in the chart or not (defaut).
 * 
 *   {@link http://c3js.org/reference.html#zoom-enabled| c3js doc}
 *
 * @param {Boolean} rescale-zoom Use it to update the y domain according to the zoomed region.
 * 
 *   {@link http://c3js.org/reference.html#zoom-rescale| c3js doc}
 *
 * @param {Function} on-zoom-end-function Use this if you want to do something after zooming
 * 
 *   {@link http://c3js.org/reference.html#zoom-onzoomend| c3js doc} 
 *
 * @param {Array} chart-data Provide a reference to a collection that can contain dynamic data. When providing this attrbiute you also need to provide the chart-columns attribute.
 * 
 *   Array consisting of objects with values for the different columns: [{"data1":10,"data2":20},{"data1":50,"data2":60}]
 *
 * @param {Array} chart-columns Provide a reference to a collection that contains the columns. When providing this attrbiute you also need to provide the chart-data attribute.
 * 
 *   Array consisting of objects with some properties for the different columns: [{"id": "data1", "type": "line"}, {"id": "data2", "type": "bar"}]
 *
 * @param {Object} chart-x Provide information about the x column. Used when adding dynamic data to specify the field that contains the x data value.
 * 
 *   Object containing reference to the id of the x data field: {"id": "x", "name": "My Data points"}
 *
 * @param {Function} callback-function Use this if you want to interact with the chart object using the api
 * 
 *   {@link http://c3js.org/reference.html#api-focus| c3js doc}
 *
 * @param {Number} transition-duration Duration of transition (in milliseconds) for chart animation. If you specify 0, transitions will be disabled which is good for large datasets.
 *
 *   {@link http://c3js.org/reference.html#transition-duration| c3js doc}
 *
 * @param {Object} initial-config Provide the initial config object to start the graph with.
 *
 * @example
 * Usage:
 *   <c3chart >
 *      <!-- sub elements -->
 *   </c3chart>
 * 
 * Example:
 *
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * Shows how to use dynamic data points.
 * 
 * <c3chart bindto-id="dynamicpie" chart-data="piePoints" chart-columns="pieColumns"/>
 * 
 *     $scope.piePoints = [{"data1": 70, "data2": 30, "data3": "100"}];
 *     $scope.pieColumns = [{"id": "data1", "type": "pie"}, {"id": "data2", "type": "pie"}, {
 *       "id": "data3",
 *       "type": "pie"
 *
 * Show how to register a callback function and use it. The screen contains a button to toggle the legend visibility.
 *
 * <c3chart bindto-id="dynamicpie" chart-data="piePoints" chart-columns="pieColumns"
 *        callback-function="handleCallback"/>
 *
 *     $scope.handleCallback = function (chartObj) {
 *       $scope.theChart = chartObj;
 *   };
 *
 *   $scope.legendIsShown = true;
 *   $scope.toggleLegend = function() {
 *       if ($scope.legendIsShown) {
 *           $scope.theChart.legend.hide();
 *       } else {
 *           $scope.theChart.legend.show();
 *       }
 *       $scope.legendIsShown= !$scope.legendIsShown;
 *       $scope.theChart.flush();
 *   };
 */
function C3Chart ($timeout) {
    var chartLinker = function (scope, element, attrs, chartCtrl) {
        var paddingTop = attrs.paddingTop;
        var paddingRight = attrs.paddingRight;
        var paddingBottom = attrs.paddingBottom;
        var paddingLeft = attrs.paddingLeft;
        var sortData = attrs.sortData;
        var transitionDuration = attrs.transitionDuration;
        var initialConfig = attrs.initialConfig;

        if (attrs.interactionEnabled && attrs.interactionEnabled === 'false') {
            chartCtrl.addInteractionEnabled(false);
        }

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
        if (sortData) {
            chartCtrl.addSorting(sortData);
        }
        if (attrs.labelsFormatFunction) {
            chartCtrl.addDataLabelsFormatFunction(scope.labelsFormatFunction());
        }
        if (attrs.onZoomEndFunction) {
            chartCtrl.addOnZoomEndFunction(scope.onZoomEndFunction());
        }
        if (attrs.subchartOnBrushFunction){
          chartCtrl.addSubchartOnBrushFunction(scope.subchartOnBrushFunction());          
        }         
        if (attrs.callbackFunction) {
            chartCtrl.addChartCallbackFunction(scope.callbackFunction());
        }
        if (transitionDuration) {
            chartCtrl.addTransitionDuration(transitionDuration);
        }
        if (initialConfig) {
            chartCtrl.addInitialConfig(initialConfig);
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
            "onZoomEndFunction": "&",            
            "showSubchart": "@showSubchart",
            "subchartOnBrushFunction": "&",
            "enableZoom": "@enableZoom",
            "rescaleZoom": "@rescaleZoom",
            "chartData": "=chartData",
            "chartColumns": "=chartColumns",
            "chartX": "=chartX",
            "callbackFunction": "&",
            "emptyLabel": "@emptyLabel"
        },
        "template": "<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
        "replace": true,
        "transclude": true,
        "link": chartLinker
    };
}
