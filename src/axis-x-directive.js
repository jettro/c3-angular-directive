angular.module('gridshore.c3js.chart')
    .directive('chartAxisX', ChartAxisX);

/**
 * @ngdoc directive
 * @name chartAxisX
 * @description
 *  `chart-axis-x` is used to customize the x axis properties. Using this directive you can padding, size, visibility of the axis.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis
 *
 * @param {String} axis-position Location of the label. Can have following values:
 *
 *   - Horizontal: inner-right (default), inner-center, inner-left, outer-right, outer-center, outer-left 
 *   - Vertical: inner-top (default), inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
 *   
 *   {@link http://c3js.org/reference.html#data-x| c3js doc}
 * @param {String} axis-label Set the text for the label of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-label| c3js doc}
 * @param {Number} padding-left Set padding on the left side of the x axis.
 * 
 *   {@link http://c3js.org/reference.html#axis-x-padding| c3js doc}
 * @param {Number} padding-right Set padding on the right side of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-padding| c3js doc}
 * @param {Number} axis-height Set the overall height of the x axis, unit in pixels.
 *
 *   {@link http://c3js.org/reference.html#axis-x-height| c3js doc}
 * @param {Boolean} show Show or hide the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-show| c3js doc}
 * @param {String} axis-localtime Default is to use localtime, but can be set to false to use UTC.
 *
 *   {@link http://c3js.org/reference.html#axis-x-localtime| c3js doc}
 * @param {String} axis-min Min value of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-min| c3js doc}
 *
 * @param {String} axis-max Max value of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-max | c3js doc}
 *
 * @param {String} axis-type The type of the x-axis can be one of the following three: timeseries, category or indexed (default).
 *
 *   {@link http://c3js.org/reference.html#axis-x-type | c3js doc}
 *
 * @param {String} axis-x-format Specify format of x axis data, usefull when using timeseries.
 *
 *   {@link http://c3js.org/reference.html#data-xFormat | c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-x axis-position="..." axis-label="..." padding-left="..." padding-right="..." .../>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 *   <chart-axis axis-rotate="true">
 *     <chart-axis-x axis-position="outer-center"
 *                   axis-label="The periods"
 *                   axis-type="category"/>
 *   </chart-axis>
 */

function ChartAxisX () {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var position = attrs.axisPosition;
        var label = attrs.axisLabel;

        var axis = {"label": {"text": label, "position": position}};

        var paddingLeft = attrs.paddingLeft;
        var paddingRight = attrs.paddingRight;
        if (paddingLeft || paddingRight) {
            paddingLeft = (paddingLeft) ? paddingLeft : 0;
            paddingRight = (paddingRight) ? paddingRight : 0;
            axis.padding = {"left": parseInt(paddingLeft), "right": parseInt(paddingRight)};
        }
        var height=attrs.axisHeight;
        if (height) {
            axis.height = parseInt(height);
        }
        
        if (attrs.show === 'false') {
            axis.show = false;
        }
        if (attrs.axisLocaltime === 'true') {
            axis.localtime=true;
        }
        var max=attrs.axisMax;
        if (max) {
            axis.max=max;
        }
        var min=attrs.axisMin;
        if (min) {
            axis.min=min;
        }
        var type=attrs.axisType;
        if (type) {
            axis.type=type;   
        }
        chartCtrl.addAxisProperties('x', axis);

        var xFormat = attrs.axisXFormat;
        if (xFormat) {
            chartCtrl.setXFormat(xFormat);
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
}