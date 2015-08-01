angular.module('gridshore.c3js.chart')
    .directive('chartPoints', function () {
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
    });