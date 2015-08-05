angular.module('gridshore.c3js.chart')
    .directive('chartColumn', ChartColumn);

/**
 * @ngdoc directive
 * @name chartColumn
 * @description
 *  `chart-column` Used to provide data values for the chart as well as the name and some other config options.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} column-id The id used to uniquely identify the column
 *   
 * @param {String} column-values The values for this column to plot.
 *
 * @param {String} column-type The type of the column to show: line, spline, bar, step, area, area-spline, area-step, scatter, pie, donut, gauge
 *
 *   {@link http://c3js.org/reference.html#data-type| c3js docs}
 *
 * @param {String} column-name The name of the column as used to print in the label.
 *
 *   {@link http://c3js.org/reference.html#data-names| c3js docs}
 *
 * @param {String} column-color The color to use for this column.
 *
 *   {@link http://c3js.org/reference.html#data-names| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-column column-values="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-column column-id="data 1"
 *               column-name="Data 1"
 *               column-color="red"
 *               column-values="30,200,100,400,150,250"
 *               column-type="spline"/>  
 * 
 */
function ChartColumn () {
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
}
