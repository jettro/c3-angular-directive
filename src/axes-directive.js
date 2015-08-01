angular.module('gridshore.c3js.chart')
    .directive('chartAxes', function () {
        var axesLinker = function (scope, element, attrs, chartCtrl) {
            var x = attrs.valuesX;
            if (x) {
                chartCtrl.addXAxisValues(x);
            }

            var xs = attrs.valuesXs;
            var xsValues = {};
            if (xs) {
                xsItems = xs.split(",");
                for (var xsI in xsItems) {
                    xsItem = xsItems[xsI].split(":");
                    xsValues[xsItem[0]] = xsItem[1];
                }
                chartCtrl.addXSValues(xsValues);
            }

            var y = attrs.y;
            var y2 = attrs.y2;
            var yAxis = {};
            if (y2) {
                var items = y2.split(",");
                for (var item in items) {
                    yAxis[items[item]] = "y2";
                }
                if (y) {
                    var yItems = y.split(",");
                    for (var yItem in yItems) {
                        yAxis[yItems[yItem]] = "y";
                    }
                }
                chartCtrl.addYAxis(yAxis);
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": axesLinker
        };
    });
