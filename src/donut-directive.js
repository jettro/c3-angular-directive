angular.module('gridshore.c3js.chart')
    .directive('chartDonut', ChartDonut);
/**
 * @ngdoc directive
 * @name chartDonut
 * @description
 *  `chart-donut` SPecific configuration options for creating a donut chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} show-label Show labels in the Donut.
 *
 *   {@link http://c3js.org/reference.html#donut-label-show| c3js docs}
 *   
 * @param {Number} threshold-label Set the threshold to show or hide labels.
 *
 *   {@link http://c3js.org/reference.html#donut-label-threshold| c3js docs}
 * 
 * @param {Boolean} expand Enable or disable whether to expand a pie part. True is the default.
 *
 *   {@link http://c3js.org/reference.html#donut-expand| c3js docs}
 *
 * @param {Number} width The width of the donut.
 *
 *   {@link http://c3js.org/reference.html#donut-width| c3js docs}
 *
 * @param {String} title The title for the donut chart.
 *
 *   {@link http://c3js.org/reference.html#donut-title| c3js docs}
 *
 * @param {Function} label-format-function Function to format the labels.
 *
 *   {@link http://c3js.org/reference.html#donut-label-format| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-donut show-label="..." threshold-label="..." expand="..." width="..." title="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <c3chart bindto-id="donut-plot1-chart">
 *   <chart-column column-id="Data 1"
 *                 column-values="70"
 *                 column-type="donut"/>
 *   <chart-column column-id="Data 2"
 *                 column-values="35"
 *                 column-type="donut"/>
 *   <chart-column column-id="Data 3"
 *                 column-values="60"
 *                 column-type="donut"/>
 *   <chart-donut title="Donut" width="60"/>
 * </c3chart>
 */    
function ChartDonut() {
    var donutLinker = function (scope, element, attrs, chartCtrl) {
        var donut = {};
        if (attrs.showLabel) {
            donut.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.thresholdLabel) {
            if (!donut.label) {
                donut.label = {};
            }
            donut.label.threshold = parseFloat(attrs.thresholdLabel);
        }
        if (attrs.expand) {
            donut.expand = (attrs.expand === 'true');
        }
        if (attrs.width) {
            donut.width = parseInt(attrs.width);
        }
        if (attrs.title) {
            donut.title = attrs.title;
        }
        chartCtrl.addDonut(donut);
        if (attrs.labelFormatFunction) {
            chartCtrl.addDonutLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            "labelFormatFunction": "&"
        },
        replace: true,
        link: donutLinker
    };
}
