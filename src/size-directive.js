angular.module('gridshore.c3js.chart')
    .directive('chartSize', ChartSize);

/**
 * @ngdoc directive
 * @name chartSize
 * @description
 *  `chart-size` is used to configure size properties of the chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Number} chartWidth Width of the chart element, by default it will be 
 * calculated from the parent container.
 *   
 *   {@link http://c3js.org/reference.html#size-width| c3js docs}
 *
 * @param {Number} chartHeight Height of the chart element, by default it will be 
 * calculated from the parent container.
 *   
 *   {@link http://c3js.org/reference.html#size-height| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-size chart-height="..." chart-width="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-size chart-height="600" chart-width="600"/>
 */
function ChartSize() {
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
}
