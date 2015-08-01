angular.module('gridshore.c3js.chart')
    .directive('chartGridOptional', function () {
        var gridLinker = function (scope, element, attrs, chartCtrl) {
            var axisId = attrs.axisId;
            var value = attrs.gridValue;
            var text = attrs.gridText;

            chartCtrl.addGridLine(axisId, value, text);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": gridLinker
        };
    });
