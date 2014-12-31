# C3JS and AngularJS integration samples
This repository contains some samples to demonstrate what you can do when you integrate AngularJS with C3JS. This repository is mainly here to support a few blogpost. I am working an a better location for the directives. For now you can find them here.

## Goal
Come up with a few samples to demonstrate how to integrate C3js with AngularJS

## References
Homepage c3js library [http://c3js.org]
Homepage AngularJS [https://angularjs.org]

Blogpost about c3js by Roberto van der Linden: [Creating charts with c3.js](http://blog.trifork.com/2014/07/29/creating-charts-with-c3-js/)
Blogpost about integrating c3js and angularjs by Jettro Coenradie: [Using C3js with AngularJS](http://www.gridshore.nl/2014/07/29/using-c3js-angularjs/)

Blogpost about AngularJS Directives for c3js: [Angularjs directives for c3js chart library](http://blog.trifork.com/2014/08/19/angularjs-directives-for-c3-js-chart-library/)

Blogpost about the improvements I made using grunt and bower: TODO

## Installation and development
We are using grunt and bower during development. Bower makes it easier to use it for your own project as well. More on this in the next section. If you want to try out the project and change sources or something like that, you can use bower and grunt to do development.

First use npm to install all grunt plugins, than use bower to install all bower dependencies.
```
npm install
bower install
```
Now grunt is available, you can use some of the utilities that grunt has in store for you. A nice one is to use the watch task and change one of the samples. There is also a plugin in place for running a development server. Just type grunt devserver and connect to port 8888 on your localhost.


## Using it in your own project
The easiest way to use the directives is to use bower to install it to your project.
```
bower install c3-angular --save
```
In the end you just need one file in your project: c3-angular.min.js

## Documentation
Check the blogpost from Roberto above if you want an introdcution into what c3.js can do for you. If you want information about the basic usage of AngularJS together with C3.JS, check the first blogpost by Jettro. This documentation focussus on the directives.

The goal for the directive is to come up with some sort of DSL in the HTML language for creating charts with c3.js. I will go though the different aspects of creating a chart first.

You do not need a webserver to run the samples, the easiest way is to clone the repository from github or download the zip. Now we have grunt it is also easy to use a development webserver. Just execute grunt devserver

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
Now the data is coming from an AngularJS model object. We can use AngularJS features to obtain the data from a service for instance, or we can even do something with an update of the data using *$interval*. The directive listens for changes to the *datapoints* model, it does not change when *datacolumns* or *datax* changes. if the datapoints changes, the graph is redrawn. Open directive2.html to see the sample.

### directive3.html
In this sample we are going to show you the timeseries chart, as available from c3.js. To do this, you need to add information about the x-axis. We need to tell it to be of type *timeseries* and we define the format of the tick (meaning the values on the x-axis). The following code block shows the html.
```html
<c3chart bindto-id="chart" chart-data="datapoints" chart-columns="datacolumns" chart-x="datax">
	<chart-axis>
		<chart-axis-x axis-id="x" axis-type="timeseries">
	        <chart-axis-x-tick tick-format="%Y-%m-%d"/>
		</chart-axis-x>
	</chart-axis>
</c3chart>
```
Next the trick to update the data in the chart. What we do is change the model parameter in the $scope called *datapoints*. Than in the directive we watch the datapoints collection and redraw the chart if changes.
```javascript
var graphApp = angular.module('graphApp', ['gridshore.c3js.chart','graphApp.services']);

graphApp.controller('GraphCtrl', function ($scope, $interval,dataService) {
	$scope.datapoints=[];
	$scope.datacolumns=[{"id":"top-1","type":"line","name":"Top one","color":"black"},
	                    {"id":"top-2","type":"spline","name":"Top two"}];
	$scope.datax={"id":"x"};

	$interval(function(){
		dataService.loadData(function(data){
			$scope.datapoints.push(data);
		});		
	},1000,10);
});

var services = angular.module('graphApp.services', []);
services.factory('dataService', function() {
	function DataService() {
		var maxNumber = 200;

		// API methods
		this.loadData = function(callback) {
			callback({"x":new Date(),"top-1":randomNumber(),"top-2":randomNumber()});
		};

		function randomNumber() {
			return Math.floor((Math.random() * maxNumber) + 1);
		}
	}
	return new DataService();
});
```
The dataService is used to generate a new object with three properties, the current datetime for the x axis and two random values for the different lines. Notice the *$interval* which helps us to wait one second before creating a new point. It will do this 10 times. The most important part here is that you do not need to change the directive to make the data dynamic. This is purely done in the controller for the page you are on.

Next up are more features made available by the very nice c3.js library.
### directive3.html
I am not going to show all the code in this case. I am focussing on changes. First one is setting the name of the column and the color of the column (or line)
```html
<chart-column column-id="data 1" 
     		  column-name="Data 1"
     		  column-color="red"
			  column-values="30,200,100,400,150,250"
			  column-type="spline"/>
```
Use the attributes column-color and column-name. Next up is adding a second verticle axis. First part is specifying which columns belong to x, y and y2. Next is configuring things like range and padding and labels for the axis. Padding is placing empty space on top of the y-axis.
```html
<chart-axes values-x="x" y="data1,data3" y2="data2"/>
<chart-axis>
	<chart-axis-x axis-position="outer-center"
            	  axis-label="Number by 10"
            	  axis-type="category">
        <chart-axis-x-tick tick-rotate="50"/>
    </chart-axis-x>
	<chart-axis-y axis-id="y"
	              axis-position="outer-right"
            	  axis-label="Higher numbers"
            	  padding-top="100"
            	  padding-bottom="0"
            	  range-min="0"/>
	<chart-axis-y axis-id="y2"
	              axis-position="outer-right"
            	  axis-label="Lower numbers"
            	  padding-top="10"
            	  padding-bottom="0"
            	  range-max="100"
            	  range-min="0"/>
</chart-axis>
```
Notice the *chart-axis-x-tick*, this shows the cool feature to rotate the labels on the x-axis. Next up is adding a grid to the chart. You can configure to show the x and y grid. But you can also position one grid line on a specific value.
```html
<chart-grid show-x="false" show-y="true">
	<chart-grid-optional axis-id="x" grid-value="1" grid-text="Start"/>
	<chart-grid-optional axis-id="y" grid-value="20" grid-text="Minimum"/>
	<chart-grid-optional axis-id="y" grid-value="200" grid-text="Maximum"/>
</chart-grid>
```
Another really cool feature is adding the subchart, with this you can select just a selection of the datapoints in the chart. Together with the zoom functionality this makes a very interactive chart. You have to try it to believe it.
```html
<c3chart bindto-id="chart5" show-labels="true" show-subchart="true" enable-zoom="true">		
</c3chart>
```
The last thing to show for now is putting the legenda at another location, changing the tooltip, change the size of the chart and provide an array of colors to use for the lines.
```html
<chart-legend show-legend="true" legend-position="right"/>
<chart-colors color-pattern="#1f77b4,#ffbb78,#2ca02c,#ff7f0e"/>
<chart-size chart-height="600" chart-width="600"/>
<chart-tooltip show-tooltip="true" group-tooltip="false"/>
```