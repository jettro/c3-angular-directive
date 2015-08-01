angular.module('gridshore.c3js.chart')
    .directive('chartDonut', function () {
        var donutLinker = function (scope, element, attrs, chartCtrl) {
            var donut = {};
            if (attrs.showLabel) {
                donut.label = {"show": (attrs.showLabel === 'true')};
            }
            if (attrs.thresholdLabel) {
                if (!donut.label) {
                    donut.label = {};
                }
                donut.label.threshold = parseFloat(attrs.thresholdLabel);
            }
            if (attrs.expand) {
                donut.expand = (attrs.expand === 'true');
            }
            if (attrs.width) {
                donut.width = parseInt(attrs.width);
            }
            if (attrs.title) {
                donut.title = attrs.title;
            }
            chartCtrl.addDonut(donut);
            if (attrs.labelFormatFunction) {
                chartCtrl.addDonutLabelFormatFunction(scope.labelFormatFunction());
            }
        };

        return {
            require: '^c3chart',
            restrict: 'E',
            scope: {
                "labelFormatFunction": "&"
            },
            replace: true,
            link: donutLinker
        };
    });
