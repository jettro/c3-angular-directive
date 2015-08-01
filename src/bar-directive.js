angular.module('gridshore.c3js.chart')
    .directive('chartBar', function () {
        var barLinker = function (scope, element, attrs, chartCtrl) {
            var bar = {};
            if (attrs.width) {
                bar.width = parseInt(attrs.width);
            }
            if (attrs.ratio) {
                if (!bar.width) {
                    bar.width = {};
                }
                bar.width.ratio = parseFloat(attrs.ratio);
            }
            if (attrs.zerobased) {
                bar.zerobased = (attrs.zerobased === 'true');
            }
            chartCtrl.addBar(bar);
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {},
            replace: true,
            link: barLinker
        };
    });