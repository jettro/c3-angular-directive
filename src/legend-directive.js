angular.module('gridshore.c3js.chart')
    .directive('chartLegend', ChartLegend);

/**
 * @ngdoc directive
 * @name chartLegend
 * @description
 *  `chart-legend` is used configure the legend to add to the chart. You can also add function to handle events related
 *  to the legend: onClick, onMouseOver and onMouseOut.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showLegend Whether to show the legend or not, default is show.
 *
 *   {@link http://c3js.org/reference.html#legend-show| c3js docs}
 *
 * @param {String} legendPosition One of the following values: bottom, right, inset.
 *
 *   {@link http://c3js.org/reference.html#legend-position| c3js docs}
 *
 * @param {Function} onMouseover Provide callback to be called when you hoover the legend.
 *
 *   {@link http://c3js.org/reference.html#legend-item-onmouseover| c3js docs}
 *
 * @param {Function} onMouseout Provide callback to be called when you hoover out of the legend.
 *
 *   {@link http://c3js.org/reference.html#legend-item-onmouseout| c3js docs}
 *
 * @param {Function} onClick Provide callback to be called when you click the legend.
 *
 *   {@link http://c3js.org/reference.html#legend-item-onmouseout| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-legend show-legend="..." legend-position="..." on-click="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-legend show-legend="true" legend-position="right"/>
 */
function ChartLegend () {
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

        if (attrs.onMouseover) {
            legend = legend || {};
            legend.item = legend.item || {};
            legend.item.onmouseover = function (data) {
                scope.$apply(function () {
                    scope.onMouseover({"data": data});
                });
            };
        }
        if (attrs.onMouseout) {
            legend = legend || {};
            legend.item = legend.item || {};
            legend.item.onmouseout = function (data) {
                scope.$apply(function () {
                    scope.onMouseout({"data": data});
                });
            };
        }
        if (attrs.onClick) {
            legend = legend || {};
            legend.item = legend.item || {};

            legend.item.onclick = function (data) {
                scope.$apply(function () {
                    scope.onClick({"data": data});
                });
            };
        }

        if (legend != null) {
            chartCtrl.addLegend(legend);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "onMouseover": "&",
            "onMouseout": "&",
            "onClick": "&"
        },
        "replace": true,
        "link": legendLinker
    };
}