angular.module('gridshore.c3js.chart')
    .directive('chartRegion', ChartRegion);
/**
 * @ngdoc directive
 * @name chartRegion
 * @description
 *  `chart-region` is used to set a region property on a chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} region-id The id used to uniquely identify the column
 *
 * @param {String} region-style Style to identify the regions.
 *
 *   {@link http://c3js.org/reference.html#data-regions| c3js doc}
 *
 * @param {String} region-starts The regions where the data starts.
 *
 * @param {String} region-ends The regions where the data starts.
 *
 * @example
 * Usage:
 *   <chart-region region-id="..." region-style="..." region-starts="..." region-ends="..."/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 */

function ChartRegion() {
    var regionLinker = function (scope, element, attrs, chartCtrl) {
        var style = 'dashed',
            starts = [],
            ends = [],
            intervals = [];
        if (attrs.regionStyle) {
            style = attrs.regionStyle;
        }
        if (attrs.regionStarts){
            starts = attrs.regionStarts.split(",");
        }
        if (attrs.regionEnds){
            ends = attrs.regionEnds.split(",");
        }
        if (starts.length > ends.length) {
            intervals.push({'start': starts.pop(), 'style': style});
        }
        if (starts.length < ends.length) {
            intervals.push({'end': ends.shift(), 'style': style});
        }
        starts.forEach(function (value, i) {
             intervals.push({'start': starts[i], 'end': ends[i], 'style': style});
        });
        chartCtrl.addRegion(attrs.regionId, intervals);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: regionLinker
    };
}
