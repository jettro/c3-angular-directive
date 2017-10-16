angular.module('gridshore.c3js.chart')
    .directive('chartAxisY', ChartAxisY);

/**
 * @ngdoc directive
 * @name chartAxisY
 * @description
 *  `chart-axis-y` is used to customize the y and y2 axis properties. Using this directive you can padding, size, visibility of the axis.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis
 *
 * @param {String} axis-id Default value is 'y' but you can also provide 'y2'
 *
 * @param {String} axis-position Location of the label. Can have following values:
 *
 *   - Horizontal: inner-right (default), inner-center, inner-left, outer-right, outer-center, outer-left 
 *   - Vertical: inner-top (default), inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
 *   
 *   {@link http://c3js.org/reference.html#data-y| c3js doc}
 * @param {String} axis-label Set the text for the label of the y or y2 axis.
 *
 *   {@link http://c3js.org/reference.html#axis-y-label| c3js doc}
 * @param {Number} padding-top Set padding on the top side of the y or y2 axis.
 * 
 *   {@link http://c3js.org/reference.html#axis-y-padding| c3js doc}
 * @param {Number} padding-bottom Set padding on the bottom side of the y or y2 axis.
 *
 *   {@link http://c3js.org/reference.html#axis-y-padding| c3js doc}
 * @param {Boolean} show Configure if the y or y2 axis should be shown.
 *
 *   {@link http://c3js.org/reference.html#axis-y-show| c3js doc}
 * @param {Number} axis-min Min value of the y our y2 axis in pixels.
 *
 *   {@link http://c3js.org/reference.html#axis-y-min| c3js doc}
 *
 * @param {Number} axis-max Max value of the y or y2 axis in pixels.
 *
 *   {@link http://c3js.org/reference.html#axis-y-max| c3js doc}
 *
 * @param {Boolean} axis-inner Position the y or y2 axis within the chart.
 *
 *   {@link http://c3js.org/reference.html#axis-y-inner| c3js doc}
 *
 * @param {Boolean} axis-inverted Invert the y or y2 axis, the default is true, from top to bottom.
 *
 *   {@link http://c3js.org/reference.html#axis-y-inverted| c3js doc}
 *
 * @param {Number} axis-center Set the center of the y or y2 axis, is a numeric value.
 *
 *   {@link http://c3js.org/reference.html#axis-y-center| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-y axis-position="..." axis-label="..." padding-top="..." padding-bottom="..." .../>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 *   <chart-axis>
 *     <chart-axis-y axis-id="y"
 *                 axis-position="outer-right"
 *                 axis-label="Higher numbers"
 *                 padding-top="100"
 *                 padding-bottom="0"
 *                 axis-min="0"/>
 *     <chart-axis-y axis-id="y2"
 *                 axis-position="outer-right"
 *                 axis-label="Lower numbers"
 *                 padding-top="10"
 *                 padding-bottom="0"
 *                 axis-max="100"
 *                 axis-min="0"/>
 *  </chart-axis>
 */

function ChartAxisY() {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var id = attrs.axisId;
        var position = attrs.axisPosition;
        var label = attrs.axisLabel;

        id = ( id == undefined ? 'y' : id );

        var axis = {"label": {"text": label, "position": position}};
        if (attrs.show === 'false') {
            axis.show = false;
        } else if (id === 'y2') {
            axis.show = true;
        }
        var paddingTop = attrs.paddingTop;
        var paddingBottom = attrs.paddingBottom;
        if (paddingTop || paddingBottom) {
            paddingTop = (paddingTop) ? paddingTop : 0;
            paddingBottom = (paddingBottom) ? paddingBottom : 0;
            axis.padding = {"top": parseInt(paddingTop), "bottom": parseInt(paddingBottom)};
        }
        var axisMax = attrs.axisMax;
        var axisMin = attrs.axisMin;
        if (axisMax) {
            axis.max = parseInt(axisMax);
        }
        if (axisMin) {
            axis.min = parseInt(axisMin);
        }
        if (attrs.axisInverted === 'true') {
            axis.inverted=true;
        }
        if (attrs.axisInner === 'true') {
            axis.inner=true;
        }
        var axisCenter = attrs.axisCenter;
        if (axisCenter) {
            axis.center = parseInt(axisCenter);
        }

        chartCtrl.addAxisProperties(id, axis);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": axisLinker
    };
}