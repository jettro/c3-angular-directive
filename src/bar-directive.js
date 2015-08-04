angular.module('gridshore.c3js.chart')
    .directive('chartBar', ChartBar);
/**
 * @ngdoc directive
 * @name chartBar
 * @description
 *  `chart-bar` is used to customize the axes properties. Using this directive you can select the propertie(s) to use for the different categories or for the time field. You can also configure for the different columns to use y or y2.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Number} width Fixed with of the bars in pixels
 *   
 *   {@link http://c3js.org/reference.html#bar-width| c3js doc}
 * 
 * @param {Number} ratio Change the width of the bar by ratio
 *
 *   {@link http://c3js.org/reference.html#bar-width-ratio| c3js doc}
 * @param {Boolean} zerobased Set if we start from zero, default is true.
 * 
 *   {@link http://c3js.org/reference.html#bar-zerobased| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-bar width="..." ratio="..." zerobased="..."/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 */

function ChartBar() {
    var barLinker = function (scope, element, attrs, chartCtrl) {
        var bar = {};
        if (attrs.width) {
            bar.width = parseInt(attrs.width);
        }
        if (attrs.ratio) {
            if (!bar.width) {
                bar.width = {};
            }
            bar.width.ratio = parseFloat(attrs.ratio);
        }
        if (attrs.zerobased) {
            bar.zerobased = (attrs.zerobased === 'true');
        }
        chartCtrl.addBar(bar);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: barLinker
    };
}