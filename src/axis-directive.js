angular.module('gridshore.c3js.chart')
    .directive('chartAxis', function () {
        var axisLinker = function (scope, element, attrs, chartCtrl) {
            var rotate = attrs.axisRotate;
            if (rotate) {
                chartCtrl.rotateAxis();
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "transclude": true,
            "template": "<div ng-transclude></div>",
            "replace": true,
            "link": axisLinker
        };
    });
