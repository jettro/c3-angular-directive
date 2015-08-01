angular.module('gridshore.c3js.chart')
    .directive('chartGroup', function () {
        var groupLinker = function (scope, element, attrs, chartCtrl) {
            var group = attrs.groupValues.split(",");
            chartCtrl.addGroup(group);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": groupLinker
        };
    });
