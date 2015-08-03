angular.module('gridshore.c3js.chart')
    .directive('chartAxis', ChartAxis);

/**
 * @ngdoc directive
 * @name chartAxis
 * @description
 *  `chart-axis` is used to customize the axis properties. Can be used to change the orientation of the axis.
 *
 * Restrict To:
 *   Element
 * 
 * Parent element:
 *   c3chart
 *
 * @param {Boolean} axisRotate Configure to rotate the axis, javascript true means we rotate the axis.
 *   
 *   {@link http://c3js.org/reference.html#axis-rotated}
 *
 * @example
 * Usage:
 *   <chart-axis axis-rotate="true"/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 */

function ChartAxis () {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var rotate = attrs.axisRotate;
        if (rotate) {
            chartCtrl.rotateAxis();
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "transclude": true,
        "template": "<div ng-transclude></div>",
        "replace": true,
        "link": axisLinker
    };
};
