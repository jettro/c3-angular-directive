angular.module('gridshore.c3js.chart')
    .directive('c3chart', ['$timeout', function ($timeout) {
        var chartLinker = function (scope, element, attrs, chartCtrl) {
            var paddingTop = attrs.paddingTop;
            var paddingRight = attrs.paddingRight;
            var paddingBottom = attrs.paddingBottom;
            var paddingLeft = attrs.paddingLeft;

            if (paddingTop) {
                chartCtrl.addPadding('top', paddingTop);
            }
            if (paddingRight) {
                chartCtrl.addPadding('right', paddingRight);
            }
            if (paddingBottom) {
                chartCtrl.addPadding('bottom', paddingBottom);
            }
            if (paddingLeft) {
                chartCtrl.addPadding('left', paddingLeft);
            }
            if (attrs.labelsFormatFunction) {
                chartCtrl.addDataLabelsFormatFunction(scope.labelsFormatFunction());
            }
            if (attrs.callbackFunction) {
                chartCtrl.addChartCallbackFunction(scope.callbackFunction());
            }
            // Trick to wait for all rendering of the DOM to be finished.
            $timeout(function () {
                chartCtrl.showGraph();
            });
        };

        return {
            "restrict": "E",
            "controller": "ChartController",
            "scope": {
                "bindto": "@bindtoId",
                "showLabels": "@showLabels",
                "labelsFormatFunction": "&",
                "showSubchart": "@showSubchart",
                "enableZoom": "@enableZoom",
                "chartData": "=chartData",
                "chartColumns": "=chartColumns",
                "chartX": "=chartX",
                "callbackFunction": "&"
            },
            "template": "<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
            "replace": true,
            "transclude": true,
            "link": chartLinker
        };
    }]);
