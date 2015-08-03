angular.module('gridshore.c3js.chart')
    .directive('chartAxes', ChartAxes);
/**
 * @ngdoc directive
 * @name chartAxes
 * @description
 *  `chart-axes` is used to customize the axes properties. Using this directive you can select the propertie(s) to use for the different categories or for the time field. You can also configure for the different columns to use y or y2.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} valuesX Specify the key in the data object to use for the x value
 *   
 *   {@link http://c3js.org/reference.html#data-x}
 * @param {String} valuesXs Specify the different keys for different data columns in format
 *   columnId:key,columnId:key
 *
 *   {@link http://c3js.org/reference.html#data-xs}
 * @param {String} y Set the id(s) of columns to use the first y value (y). Format is comma separated.
 * 
 *   {@link http://c3js.org/reference.html#data-axes}
 * @param {String} y2 Set the id(s) of columns to use the second y value (y2) Format is comma separated.
 *
 *   {@link http://c3js.org/reference.html#data-axes}
 *
 * @example
 * Usage:
 *   <chart-axes values-x="..." values-Xs="..." y="..." y2="..."/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 */
function ChartAxes () {
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
};
