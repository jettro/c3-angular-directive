angular.module('gridshore.c3js.chart')
    .directive('chartAxisX', function () {
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
    });