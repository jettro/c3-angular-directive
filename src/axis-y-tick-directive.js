angular.module('gridshore.c3js.chart')
    .directive('chartAxisYTick', function () {
        var tickLinker = function (scope, element, attrs, chartCtrl) {
            var tick = {};

            var count = attrs.tickCount;
            if (count) {
                tick.count = count;
            }

            var format = attrs.tickFormat;
            if (format) {
                tick.format = d3.format(format);
            }

            chartCtrl.addYTick(tick);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": tickLinker
        };
    });