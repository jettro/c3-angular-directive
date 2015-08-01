angular.module('gridshore.c3js.chart')
    .directive('chartGrid', function () {
        var gridLinker = function (scope, element, attrs, chartCtrl) {
            var showX = attrs.showX;
            if (showX && showX === "true") {
                chartCtrl.addGrid("x");
            }
            var showY = attrs.showY;
            if (showY && showY === "true") {
                chartCtrl.addGrid("y");
            }
            var showY2 = attrs.showY2;
            if (showY2 && showY2 === "true") {
                chartCtrl.addGrid("y2");
            }
            var showFocus = attrs.showFocus;
            if (showFocus && showFocus === "false") {
                chartCtrl.hideGridFocus();
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": gridLinker,
            "transclude": true,
            "template": "<div ng-transclude></div>"
        };
    });