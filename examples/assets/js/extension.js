var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {
    $scope.extendChart = function () {
        return function (chart) {
            chart.myApi();
        };
    };
});

// you can define custom API through c3.chart.fn
// https://github.com/masayuki0812/c3/issues/253
// http://jsfiddle.net/2ja2Y/4/
c3.chart.fn.myApi = function () {
    // isTimeseries is an internal variable, but now we can access in API definition
    //this.internal.isTimeseries();
    console.log("Calling my API");
};

c3.chart.internal.fn.redrawLine = function (drawLine, withTransition) {
    return [
        (withTransition ? this.mainLine.transition() : this.mainLine)
            .attr("d", drawLine)
            .style("stroke", this.color)
            .style("opacity", 1)
    ];
};