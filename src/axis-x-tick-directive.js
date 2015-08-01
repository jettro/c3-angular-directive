angular.module('gridshore.c3js.chart')
    .directive('chartAxisXTick', function () {
        var tickLinker = function (scope, element, attrs, chartCtrl) {
            var tick = {};

            var count = attrs.tickCount;
            if (count) {
                tick.count = count;
            }

            var format = attrs.tickFormat;
            if (format) {
                tick.format = format;
            }

            var culling = attrs.tickCulling;
            if (culling) {
                culling = angular.lowercase(culling);
                if (culling === 'true') {
                    tick.culling = true;
                }
                else if (culling === 'false') {
                    tick.culling = false;
                }
            }

            var cullingMax = attrs.tickCullingMax;
            if (cullingMax) {
                tick.culling = { max: parseInt(cullingMax) }
            }

            var multiline = attrs.tickMultiline;
            if (multiline) {
                multiline = angular.lowercase(multiline);
                if (multiline === 'true') {
                    tick.multiline = true;
                }
                else if (multiline === 'false') {
                    tick.multiline = false;
                }
            }

            var centered = attrs.tickCentered;
            if (centered) {
                centered = angular.lowercase(centered);
                if (centered === 'true') {
                    tick.centered = true;
                }
                else if (centered === 'false') {
                    tick.centered = false;
                }
            }

            var rotate = attrs.tickRotate;
            if (rotate) {
                tick.rotate = rotate;
            }

            var fit = attrs.tickFit;
            if (fit) {
                fit = angular.lowercase(fit);
                if (fit === 'true') {
                    tick.fit = true;
                }
                else if (fit === 'false') {
                    tick.fit = false;
                }
            }

            chartCtrl.addXTick(tick);

            if (attrs.tickFormatFunction) {
                chartCtrl.addXTickFormatFunction(scope.tickFormatFunction());
            }

        };

        return {
            "require": "^c3chart",
            "restrict": "E",
            "scope": {
                "tickFormatFunction": "&"
            },
            "replace": true,
            "link": tickLinker
        };
    });
