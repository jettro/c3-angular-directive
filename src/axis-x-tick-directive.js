angular.module('gridshore.c3js.chart')
    .directive('chartAxisXTick', ChartAxisXTick);

/**
 * @ngdoc directive
 * @name chartAxisXTick
 * @description
 *  `chart-axis-x-tick` is used to customize the x axis tick properties. You can change the amount of ticks, the format of the tick, culling, rotating.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis-x
 *
 * @param {Number} tick-count Specify the number of ticks on the x axis.
 *   
 *   {@link http://c3js.org/reference.html#axis-x-tick-count| c3js doc}
 * @param {Boolean} tick-culling Culling means not all ticks will be shown, for category data this is by default false, for other data true.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-culling| c3js doc}
 * @param {Number} tick-culling-max Set the maximum number of ticks, if specified culling is by default true.
 * 
 *   {@link http://c3js.org/reference.html#axis-x-tick-culling-max| c3js doc}
 * @param {Boolean} tick-multiline Not sure what this does, not documented.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-multiline| c3js doc}
 * @param {Boolean} tick-centered Centers the tick on the x axis
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-centered| c3js doc}
 * @param {Number} tick-rotate Number of degrees to rotate the tick, can also be a negative number.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-rotate| c3js doc}
 * @param {Boolean} tick-fit Default is to make the tick fit the chart, if false it will be at the exact position of the x value.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-fit| c3js doc}
 *
 * @param {Boolean} tick-outer Default is not to show the outer tick, setting this to true will show the outer tick.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-outer| c3js doc}
 *
 * @param {Array} tick-values An array containing the exact values to present a tick for.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-values| c3js doc}
 *
 * @param {String} tick-format Provide a d3 based format for the tick value.
 *   format: '$,'
 *
 * @param {String} tick-format-time Provide a d3 based format for the tick value in case of timeseries data.
 *   format: '%Y-%m-%d %H:%M:%S'
 *
 *   {@link http://c3js.org/reference.html#data-xFormat| c3js doc}
 *
 * @param {Function} tick-format-function Provide a function to format the tick value.
 *   format: function (d) { return '$' + d; }
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-format| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-x-tick tick-rotate="..." tick-count="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 *   <chart-axis>
 *     <chart-axis-x axis-position="outer-center" axis-label="Number by 10"
 *                   axis-type="category">
 *       <chart-axis-x-tick tick-rotate="50"/>
 *     </chart-axis-x>
 *   </chart-axis>
 */
function ChartAxisXTick() {
    var tickLinker = function (scope, element, attrs, chartCtrl) {
        var tick = {};

        var count = attrs.tickCount;
        if (count) {
            tick.count = count;
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

        var tickValues = attrs.tickValues;
        if (tickValues) {
            if (tickValues) {
                if (tickValues.indexOf(',') > -1) {
                    tick.values = tickValues.split(',');
                } else {
                    tick.values = tickValues;
                }
            }
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

        var format = attrs.format;
        if (format) {
            tick.format = d3.format(format);
        }

        var formatTime = attrs.formatTime;
        if (formatTime) {
            tick.format = d3.time.format(format);
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
};
