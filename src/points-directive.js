angular.module('gridshore.c3js.chart')
    .directive('chartPoints', ChartPoints);

/**
 * @ngdoc directive
 * @name chartPoints
 * @description
 *  `chart-points` is used configure the points in for example a line chart. You can
 * configure the radius of the point in normal as well as expand state.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showPoint Whether to show points in the chart.
 *   
 *   {@link http://c3js.org/reference.html#point-show| c3js docs}
 *
 * @param {Boolean} pointExpandEnabled Whether to expand on mouse over.
 *   
 *   {@link http://c3js.org/reference.html#point-focus-expand-enabled| c3js docs}
 *
 * @param {Number} pointExpandRadius Radius of the point when expanded. Default is 1.75 times the 
 * normal radius.
 *
 *   {@link http://c3js.org/reference.html#point-focus-expand-r| c3js docs}
 *
 * @param {Number} pointRadius Radius of the point in normal mode. Default radius is 2.5
 *
 *   {@link http://c3js.org/reference.html#point-r| c3js docs}
 *
 * @param {Number} pointSelectRadius Radius of the point when selected, default is 4 times the normal radius.
 *
 *   {@link http://c3js.org/reference.html#point-select-r| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-points show-point="..." point-expand-enabled="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 */
function ChartPoints () {
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
}