angular.module('gridshore.c3js.chart')
    .directive('chartSize', function () {
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
    });
