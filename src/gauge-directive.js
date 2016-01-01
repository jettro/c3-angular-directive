angular.module('gridshore.c3js.chart')
    .directive('chartGauge', ChartGauge);
/**
 * @ngdoc directive
 * @name chartGauge
 * @description
 *  `chart-gauge` is used to specify specific properties when creating a guage chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Number} min The minimum value used in the Gauge.
 *   
 *   {@link http://c3js.org/reference.html#gauge-min| c3js docs}
 *
 * @param {Number} max The maximum value used in the Guage.
 *
 *   {@link http://c3js.org/reference.html#gauge-max| c3js docs}
 *
 * @param {Number} width The width of the Guage.
 *
 *   {@link http://c3js.org/reference.html#gauge-width| c3js docs}
 *
 * @param {String} units Set the units of the gauge, ' %' for instance.
 *
 *   {@link http://c3js.org/reference.html#gauge-units| c3js docs}
 *
 * @param {Boolean} show-label Set to false to hide the labels, default is true.
 *
 *   {@link http://c3js.org/reference.html#gauge-label-show| c3js docs}
 *
 * @param {Boolean} expand Set to false to prevent expanding the gauge, default is true.
 *
 *   {@link http://c3js.org/reference.html#gauge-expand| c3js docs}
 *
 * @param {Function} label-format-function Function to format the labels.
 *
 *   {@link http://c3js.org/reference.html#gauge-label-format| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-gauge min="..." max="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 *   
 */
function ChartGauge () {
    var gaugeLinker = function (scope, element, attrs, chartCtrl) {
        var gauge = {};
        if (attrs.min) {
            gauge.min = parseInt(attrs.min);
        }
        if (attrs.max) {
            gauge.max = parseInt(attrs.max);
        }
        if (attrs.width) {
            gauge.width = parseInt(attrs.width);
        }
        if (attrs.units) {
            gauge.units = attrs.units
        }
        if (attrs.showLabel) {
            gauge.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.expand) {
            gauge.expand = (attrs.expand === 'true');
        }
        chartCtrl.addGauge(gauge);
        if (attrs.labelFormatFunction) {
            chartCtrl.addGaugeLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            'labelFormatFunction': "&"
        },
        replace: true,
        link: gaugeLinker
    };
}
