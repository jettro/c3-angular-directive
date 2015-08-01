angular.module('gridshore.c3js.chart')
    .directive('chartGauge', function () {
        var gaugeLinker = function (scope, element, attrs, chartCtrl) {
            var gauge = {};
            if (attrs.min) {
                gauge.min = parseInt(attrs.min);
            }
            if (attrs.max) {
                gauge.max = parseInt(attrs.max);
            }
            if (attrs.width) {
                gauge.width = parseInt(attrs.width);
            }
            if (attrs.units) {
                gauge.units = attrs.units
            }
            if (attrs.showLabel) {
                gauge.label = {"show": (attrs.showLabel === 'true')};
            }
            if (attrs.expand) {
                gauge.expand = (attrs.expand === 'true');
            }
            chartCtrl.addGauge(gauge);
            if (attrs.labelFormatFunction) {
                chartCtrl.addGaugeLabelFormatFunction(scope.labelFormatFunction());
            }
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {
                'labelFormatFunction': "&"
            },
            replace: true,
            link: gaugeLinker
        };
    });
