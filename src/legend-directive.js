angular.module('gridshore.c3js.chart')
    .directive('chartLegend', function () {
        var legendLinker = function (scope, element, attrs, chartCtrl) {
            var legend = null;
            var show = attrs.showLegend;
            if (show && show === "false") {
                legend = {"show": false};
            } else {
                var position = attrs.legendPosition;
                if (position) {
                    legend = {"position": position};
                }
                var inset = attrs.legendInset;
                if (inset) {
                    legend = {"position":"inset","inset":{"anchor":inset}};
                }
            }

            if (legend != null) {
                chartCtrl.addLegend(legend);
            }
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": legendLinker
        };
    });