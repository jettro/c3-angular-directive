angular.module('gridshore.c3js.chart')
    .directive('chartEvents', function () {
        var eventsLinker = function (scope, element, attrs, chartCtrl) {
            if (attrs.onInit) {
                chartCtrl.addOnInitFunction(scope.onInit);
            }
            if (attrs.onMouseover) {
                chartCtrl.addOnMouseoverFunction(scope.onMouseover);
            }
            if (attrs.onMouseout) {
                chartCtrl.addOnMouseoutFunction(scope.onMouseout);
            }
            if (attrs.onResize) {
                chartCtrl.addOnResizeFunction(scope.onResize);
            }
            if (attrs.onResized) {
                chartCtrl.addOnResizedFunction(scope.onResized);
            }
            if (attrs.onRendered) {
                chartCtrl.addOnRenderedFunction(scope.onRendered);
            }
            if (attrs.onClickData) {
                chartCtrl.addDataOnClickFunction(scope.onClickData);
            }
            if (attrs.onMouseoverData) {
                chartCtrl.addDataOnMouseoverFunction(scope.onMouseoverData);
            }
            if (attrs.onMouseoutData) {
                chartCtrl.addDataOnMouseoutFunction(scope.onMouseoutData);
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {
                "onInit": "&",
                "onMouseover": "&",
                "onMouseout": "&",
                "onResize": "&",
                "onResized": "&",
                "onRendered": "&",
                "onClickData": "&",
                "onMouseoverData": "&",
                "onMouseoutData": "&"
            },
            "replace": true,
            "link": eventsLinker
        };
    });
