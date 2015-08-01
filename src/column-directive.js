angular.module('gridshore.c3js.chart')
    .directive('chartColumn', function () {
        var columnLinker = function (scope, element, attrs, chartCtrl) {
            var column = attrs.columnValues.split(",");
            column.unshift(attrs.columnId);
            chartCtrl.addColumn(column, attrs.columnType, attrs.columnName, attrs.columnColor);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": columnLinker
        };
    });
