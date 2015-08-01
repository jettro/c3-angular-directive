angular.module('gridshore.c3js.chart')
    .directive('chartAxisY', function () {
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

            chartCtrl.addAxisProperties(id, axis);
        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {},
            "replace": true,
            "link": axisLinker
        };
    });