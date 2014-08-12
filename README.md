# C3JS and AngularJS integration samples
This repository contains some samples to demonstrate what you can do when you integrate AngularJS with C3JS. This repository is mainly here to support a few blogpost. I am working an a better location for the directives. For now you can find them here.

## Goal
Come up with a few samples to demonstrate how to integrate C3js with AngularJS

## References
Homepage c3js library [http://c3js.org]
Homepage AngularJS [https://angularjs.org]

Blogpost about c3js by Roberto van der Linden: [Creating charts with c3.js](http://blog.trifork.com/2014/07/29/creating-charts-with-c3-js/)
Blogpost about integrating c3js and angularjs by Jettro Coenradie: [Using C3js with AngularJS](http://www.gridshore.nl/2014/07/29/using-c3js-angularjs/)

Blogpost about AngularJS Directives for c3js: TODO

## Documentation
Check the blogpost from Roberto above if you want an introdcution into what c3.js can do for you. If you want information about the basic usage of AngularJS together with C3.JS, check the first blogpost by Jettro. This documentation focussus on the directives.

The goal for the directive is to come up with some sort of DSL in the HTML language for creating charts with c3.js. I will go though the different aspects of creating a chart first.

You do not need a webserver to run the samples, the easiest way is to clone the repository from github or download the zip.

### directive1.html
This one shows the one of the most basic charts, we define the data right in the chart. One line, no additional configuration.

```html
<c3chart bindto-id="chart1">
	<chart-column column-id="data-1" 
				  column-values="30,200,100,400,150,250"
				  column-type="line"/>		
</c3chart>

```
The main element is **c3chart**, with the attribute *bindto-id* we define the id of the html element the c3js chart is bound to. This makes it possible to add multiple charts to one page. In this sample we provide the data using a predifined set of numbers. This is done by the **chart-column** element. In this element we can define the id of the line, which is used in the tooltip and the legenda. Also you can change the type of the column by changing the *column-type*, change it to spline for instance.

Another way of providing data is using a more angular approach. Now we provide the data using the $scope of the controller.
```html
<c3chart bindto-id="chart" chart-data="datapoints" chart-columns="datacolumns">
</c3chart>
```
```javascript
var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.datapoints=[{"x":10,"top-1":10,"top-2":15},
	                   {"x":20,"top-1":100,"top-2":35},
	                   {"x":30,"top-1":15,"top-2":75},
	                   {"x":40,"top-1":50,"top-2":45}];
	$scope.datacolumns=[{"id":"top-1","type":"line"},
	                    {"id":"top-2","type":"spline"}];
	$scope.datax={"id":"x"};
});
```
Notice that we put three objects in the $scope, two of which we also have in the html directive (*datapoints* and *datacolumns*). This time we have 2 lines: top-1 and top-2. As you can see we can configure the type again, this time I configured two different types, *line* and *spline*.

If you look closely at the datapoints, you can see we have an additional property called **x** as well as a different object on the $scope called **datax**. We can add an attribute to the directive called *chart-x* that tells c3js to use the values from *x* as values on the x axis. We can also change the name *top-1* to a nicer version and we can change the colors of the lines if we want to. The following code shows the changes.
```html
<c3chart bindto-id="chart" chart-data="datapoints" chart-columns="datacolumns" chart-x="datax">
</c3chart>
```
```javascript
var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {
	$scope.datapoints=[{"x":10,"top-1":10,"top-2":15},
	                   {"x":20,"top-1":100,"top-2":35},
	                   {"x":30,"top-1":15,"top-2":75},
	                   {"x":40,"top-1":50,"top-2":45}];
	$scope.datacolumns=[{"id":"top-1","type":"line","name":"Top one","color":"green"},
	                    {"id":"top-2","type":"spline","name":"Top two","color":"blue"}];
	$scope.datax={"id":"x"};
});
```
Now the data is coming from an AngularJS model object. We can use AngularJS features to obtain the data from a service for instance, or we can even do something with an update of the data using *$interval* for instance. The directive listens for changes to the *datapoints* model, it does not change when datacolumns of datax changes. if the datapoints changes, the graph is redrawn.
