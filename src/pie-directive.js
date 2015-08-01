angular.module('gridshore.c3js.chart')
    .directive('chartPie', function () {
        var pieLinker = function (scope, element, attrs, chartCtrl) {
            var pie = {};
            if (attrs.showLabel) {
                pie.label = {"show": (attrs.showLabel === 'true')};
            }
            if (attrs.thresholdLabel) {
                if (!pie.label) {
                    pie.label = {};
                }
                pie.label.threshold = parseFloat(attrs.thresholdLabel);
            }
            if (attrs.expand) {
                pie.expand = (attrs.expand === 'true');
            }
            chartCtrl.addPie(pie);
            if (attrs.labelFormatFunction) {
                chartCtrl.addPieLabelFormatFunction(scope.labelFormatFunction());
            }
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {
                "labelFormatFunction": "&"
            },
            replace: true,
            link: pieLinker
        };
    });
