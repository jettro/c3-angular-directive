angular.module('gridshore.c3js.chart')
    .directive('chartEvents', ChartEvents);

/**
 * @ngdoc directive
 * @name chartEvents
 * @description
 *  `chart-events` Used to provide callback functions to respond to events of the charts.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Function} on-init The on init callback function.
 *   
 *   {@link http://c3js.org/reference.html#oninit| c3js docs}
 *
 * @param {Function} on-rendered Provide the callback to respond to on-rendered. Basically, this callback will be called in each time when the chart is redrawed.
 *
 *   {@link http://c3js.org/reference.html#onrendered| c3js docs}
 *
 * @param {Function} on-mouseover Provide callback to be called when you hoover the chart.
 *
 *   {@link http://c3js.org/reference.html#onmouseover| c3js docs}
 *
 * @param {Function} on-mouseout Provide callback to be called when you hoover out of the chart.
 *
 *   {@link http://c3js.org/reference.html#onmouseout| c3js docs}
 *
 * @param {Function} on-resize Provide callback to be called when the chart is resizing.
 *
 *   {@link http://c3js.org/reference.html#onresize| c3js docs}
 *
 * @param {Function} on-resized Provide callback to be called when the chart is resized.
 *
 *   {@link http://c3js.org/reference.html#onresized| c3js docs}
 *
 * @param {Function} on-click-data Provide callback to be called one of the data points, lines, bars, etc. is clicked.
 *
 *   {@link http://c3js.org/reference.html#onclickdata| c3js docs}
 *
 * @param {Function} on-mouseover-data Provide callback to be called one of the data points, lines, bars, etc. is hoovered.
 *
 *   {@link http://c3js.org/reference.html#onclickdata| c3js docs}
 *
 * @param {Function} on-mouseout-data Provide callback to be called one of the data points, lines, bars, etc. is hoovered out.
 *
 *   {@link http://c3js.org/reference.html#onclickdata| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-events on-init="..." on-rendered="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 *   <c3chart bindto-id="donut-plot1-chart">
 *     <chart-column column-id="Data 1"
 *                   column-values="70"
 *                   column-type="donut"/>
 *     <chart-column column-id="Data 2"
 *                   column-values="35"
 *                   column-type="donut"/>
 *     <chart-column column-id="Data 3"
 *                   column-values="60"
 *                   column-type="donut"/>
 *     <chart-donut title="Donut" width="60"/>
 *     <chart-events on-click-data="showClick(data)"/>
 *   </c3chart>
 *
 *   graphApp.controller('GraphCtrl', function ($scope) {
 *     $scope.clicked = {};
 *     $scope.showClick = function(data) {
 *     $scope.clicked = data;
 *   }
 */
function ChartEvents() {
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
}
