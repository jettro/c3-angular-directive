angular.module('gridshore.c3js.chart')
    .directive('chartTooltip', ChartTooltip);

/**
 * @ngdoc directive
 * @name chartTooltip
 * @description
 *  `chart-tooltip` is used to configure the look and feel of the tooltip. You can
 * configure to show the tooltip or not and the formatting of labels, values, etc.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showTooltip Whether to show the tooltip or not.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-show| c3js docs}
 *
 * @param {Boolean} hideTooltipTitle Whether to show the tooltip title or not.
 *   
 * @param {Boolean} groupTooltip Whether to group all tooltips of the different 
 * columns in the chart.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-grouped| c3js docs}
 *
 * @param {Function} titleFormatFunction Function to format the title of the tooltip.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-format-title| c3js docs}
 *
 * @param {Function} nameFormatFunction Function to format the name of the tooltip.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-format-name| c3js docs}
 *
 * @param {Function} valueFormatFunction Function to format the value of the tooltip.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-format-value| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-size chart-height="..." chart-width="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 */
function ChartTooltip () {
    var tooltipLinker = function (scope, element, attrs, chartCtrl) {
        var tooltip = null;
        var show      = attrs.showTooltip;
        var hideTitle = attrs.hideTooltipTitle;
        var joined    = attrs.joinedTooltip;

        if (show && show === "false") {
            tooltip = {"show": false};
        } else {
            var grouped = attrs.groupTooltip;
            if (grouped && grouped === "false") {
                tooltip = {"grouped": false};
            }
        }

        if (joined && joined === "true") {
            tooltip = tooltip || {};
            tooltip.contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
                var $$ = this, config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat  = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, CLASS;
                CLASS = {
                    tooltipContainer: 'c3-tooltip-container',
                    tooltip         : 'c3-tooltip',
                    tooltipName     : 'c3-tooltip-name'
                };
                for (i = d[0].x; i < (d[0].x + 1); i++) {
                    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (! text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    if (value !== undefined) {
                        name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);
                        bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                        text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                        text += "<td class='value'>" + value + "</td>";
                        text += "</tr>";
                    }
                }
                return text + "</table>";
            }
        }

        if (tooltip != null) {
            chartCtrl.addTooltip(tooltip);
        }
        if (attrs.titleFormatFunction) {
            chartCtrl.addTooltipTitleFormatFunction(scope.titleFormatFunction());
        }
        if (attrs.nameFormatFunction) {
            chartCtrl.addTooltipNameFormatFunction(scope.nameFormatFunction());
        }
        if (attrs.valueFormatFunction) {
            chartCtrl.addTooltipValueFormatFunction(scope.valueFormatFunction());
        }

    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "valueFormatFunction": '&',
            "nameFormatFunction" : "&",
            "titleFormatFunction": "&"
        },
        "replace": true,
        "link": tooltipLinker
    };
}