angular.module('gridshore.c3js.chart')
    .directive('chartColors', ChartColors);

/**
 * @ngdoc directive
 * @name chartColors
 * @description
 *  `chart-colors` is used to specify the colors to use in the chart. You can provide the colors or a function to determine the colors.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} color-pattern A string containing comma separated hex colors
 * @param {String} thresholds A string containing comma separated numeric values
 *   
 * {@link http://c3js.org/reference.html#color-pattern| c3js docs}
 * @param {Function} color-function Provide a function that receives the value to determine a color for that value.
 *
 * {@link http://c3js.org/reference.html#data-color| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-colors color-pattern="..." color-function="..." thresholds="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 *   
 */
function ChartColors () {
    var colorsLinker = function (scope, element, attrs, chartCtrl) {
        var pattern = attrs.colorPattern;
        if (pattern) {
            chartCtrl.addColorPatterns(pattern.split(","));
        }

        var thresholds = attrs.thresholds;
        if(thresholds){
            chartCtrl.addColorThresholds(thresholds.split(","));
        }
        
        if (attrs.colorFunction) {
            chartCtrl.addColorFunction(scope.colorFunction());
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "colorFunction": "&"
        },
        "replace": true,
        "link": colorsLinker
    };
}
