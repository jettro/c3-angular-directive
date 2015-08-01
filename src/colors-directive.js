angular.module('gridshore.c3js.chart')
    .directive('chartColors', function () {
        var colorsLinker = function (scope, element, attrs, chartCtrl) {
            var pattern = attrs.colorPattern;
            if (pattern) {
                chartCtrl.addColors(pattern.split(","));
            }

            if (attrs.colorFunction) {
                chartCtrl.addColorFunction(scope.colorFunction());
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {
                "colorFunction": "&"
            },
            "replace": true,
            "link": colorsLinker
        };
    });
