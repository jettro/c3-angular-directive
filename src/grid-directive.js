angular.module('gridshore.c3js.chart')
    .directive('chartGrid', ChartGrid);

/**
 * @ngdoc directive
 * @name chartGrid
 * @description
 *  `chart-grid` is used to specify properties to show a grid.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showX Whether to show the x axis grid.
 *   
 *   {@link http://c3js.org/reference.html#grid-x-show| c3js docs}
 *
 * @param {Boolean} showY Whether to show the y axis grid.
 *
 *   {@link http://c3js.org/reference.html#grid-y-show| c3js docs}
 *
 * @param {Boolean} showY2 Whether to show the y2 axis grid.
 *
 *   {@link http://c3js.org/reference.html#grid-y-show| c3js docs}
 *
 * @param {Boolean} showFocus Whether to enable the focus grid.
 *
 *   {@link http://c3js.org/reference.html#grid-focus-show| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-grid showX="..." showY="..." showY2="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-grid show-x="false" show-y="true">
 *   <chart-grid-optional axis-id="x" grid-value="1" grid-text="Start"/>
 *   <chart-grid-optional axis-id="y" grid-value="20" grid-text="Minimum"/>
 *   <chart-grid-optional axis-id="y" grid-value="200" grid-text="Maximum"/>
 * </chart-grid>  
 */
function ChartGrid () {
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
}