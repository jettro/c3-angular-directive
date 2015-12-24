angular.module('gridshore.c3js.chart')
    .directive('chartAxisYTick', ChartAxisYTick);

/**
 * @ngdoc directive
 * @name chartAxisYTick
 * @description
 *  `chart-axis-y-tick` is used to customize the y or y2 axis tick properties. You can change the amount of ticks, the format of the tick, culling, rotating.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis-y
 *
 * @param {Number} tick-count Specify the number of ticks on the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-count| c3js doc}
 *
 * @param {Boolean} tick-outer Default is not to show the outer tick, setting this to true will show the outer tick.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-outer| c3js doc}
 *
 * @param {Array} tick-values An array containing the exact values to present a tick for.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-values| c3js doc}
 *
 * @param {Function} tick-format Provide a d3 based format for the tick value.
 *   format: '$,'
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-format| c3js doc}
 *
 * @param {Function} tick-format-function Provide a function to format the tick value.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-format| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-y-tick tick-outer="..." tick-count="..."/>
 *
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 */
function ChartAxisYTick() {
    var tickLinker = function (scope, element, attrs, chartCtrl) {
        var tick = {};

        var count = attrs.tickCount;
        if (count) {
            tick.count = count;
        }

        var outer = attrs.tickOuter;
        if (outer) {
            outer = angular.lowercase(outer);
            if (outer === 'true') {
                tick.outer = true;
            }
            else if (outer === 'false') {
                tick.outer = false;
            }
        }

        var tickValues = attrs.tickValues;
        if (tickValues) {
            if (tickValues.indexOf(',') > -1) {
                tick.values = tickValues.split(',');
            } else {
                tick.values = tickValues;
            }
        }

        var format = attrs.tickFormat;
        if (format) {
            tick.format = d3.format(format);
        }

        chartCtrl.addYTick(tick);

        if (attrs.tickFormatFunction) {
            chartCtrl.addYTickFormatFunction(scope.tickFormatFunction());
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
}