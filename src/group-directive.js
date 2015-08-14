angular.module('gridshore.c3js.chart')
    .directive('chartGroup', ChartGroup);

/**
 * @ngdoc directive
 * @name chartGroup
 * @description
 *  `chart-group` is used to group columns, for instance to add them to the 
 * same column for the same x value. Input is a comma separated string with the
 * id's of the columns to group.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} groupValues Comma separated column ids.
 *   
 *   {@link http://c3js.org/reference.html#data-groups| c3js docs}
 *
 *
 * @example
 * Usage:
 *   <chart-group group-values="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <c3chart bindto-id="stacked-bar-plot1-chart">
 *   <chart-column column-id="data 1"
 *             column-name="Data 1"
 *             column-color="red"
 *             column-values="30,200,100,400,150,250"
 *             column-type="bar"/>
 *   <chart-column column-id="data 2"
 *             column-name="Data 2"
 *             column-color="green"
 *             column-values="50,20,10,40,15,25"
 *             column-type="bar"/>
 *   <chart-group group-values="data 1,data 2"/>
 * </c3chart>  
 */
function ChartGroup () {
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
}
