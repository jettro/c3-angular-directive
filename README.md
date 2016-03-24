# C3JS AngularJS directives

[![Join the chat at https://gitter.im/jettro/c3-angular-directive](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jettro/c3-angular-directive?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This repository contains directives that let you easily create graphs using the c3js library. Most of the options that are available in c3js are now also available to you in angularjs. Below one of the most basic examples:
```html
<c3chart bindto-id="chart1">
	<chart-column column-id="data-1" 
				  column-values="30,200,100,400,150,250"
				  column-type="line"/>		
</c3chart>

```

# Documentation
There is a page with samples and documentation available:
http://jettro.github.io/c3-angular-directive/

There is now extensive API docs available here:
http://jettro.github.io/c3-angular-directive/api-docs/0.7/index.html

The project contains a number of examples that can be started using grunt:

```
grunt devserver
```

## Goal
Come up with a number of directives to integrate C3js with AngularJS

## References
Homepage c3js library [http://c3js.org]
Homepage AngularJS [https://angularjs.org]
Homepage d3 library [http://d3js.org]

Blogpost about AngularJS Directives for c3js: [Angularjs directives for c3js chart library](http://blog.trifork.com/2014/08/19/angularjs-directives-for-c3-js-chart-library/)

Blogpost about the improvements I made using grunt and bower: [C3JS directives using angularjs](http://amsterdam.luminis.eu/2015/01/01/c3js-directives-for-angularjs/)

Blogpost about c3js by Roberto van der Linden: [Creating charts with c3.js](http://blog.trifork.com/2014/07/29/creating-charts-with-c3-js/)
Blogpost about integrating c3js and angularjs by Jettro Coenradie: [Using C3js with AngularJS](http://www.gridshore.nl/2014/07/29/using-c3js-angularjs/)

## Installation and development
We are using grunt and bower during development. Bower makes it easier to use it for your own project as well. More on this in the next section. If you want to try out the project and change sources or something like that, you can use bower and grunt to do development.

First use npm to install all grunt plugins, than use bower to install all bower dependencies.
```
npm install
bower install
```
Now grunt is available, you can use some of the utilities that grunt has in store for you. A nice one is to use the watch task and change one of the samples. There is also a plugin in place for running a development server. Just type _grunt devserver_ and connect to port 8888 on your localhost.


## Using it in your own project
The easiest way to use the directives is to use bower to install it to your project.
```
bower install c3-angular --save
```
In the end you just need one file in your project: c3-angular.min.js

## Version History

### 1.2
- In issue 104 @AesSedai proposed more properties for the legend inset directive. These are now added.
- In issue 102 @jtaylor1022 asked for the grid-class attribute and I added the position as well.

Bugs fixed:
- Issue 104: Fixed problem with the time format function

### 1.1
Added pull requests
- marton987 (Martin Freytes): Added regions to line charts by adding a new directive
- stevezau (Steve): Added support for empty data labels.

Bugs fixed:
- Issue 86: Has to do with the colors.

### 1.0
Squashed a number of bugs, some of them related to tick formatting of timeseries data.

Added the  click  and mouse events on the legend.

Bigger refactoring to the structure of the source code and a big change to the examples.

### 0.7.0
Focus is improvements to the structure of the project and the documentation. Also fixed some bugs.

### 0.6.0
Main part to move to a higher version is that we have the possibility now to add a callback function. In the examples folder there is a page callback-sample.html that shows how to do this. You can register the callback function to recevei the actual chart object that you can manipulate using the c3js API methods.
http://c3js.org/reference.html#api

### 0.5.0
Added a big pull request by EmmN that includes formatting improvements. All charts now support adding a format function to format labels and tooltips.

### 0.4.0
Added config for the pie and donut charts
Added config for points as requested by Lazymondaysunday
Added an extensive tutorial in the examples package
Finalized the events as requested by pehrlich and Tropicalista
Improved the sample on the project page
http://jettro.github.io/c3-angular-directive/

### 0.3.1
Added a gauge config by richardthombs
Added a stacked bar chart requested by vinnytheviking
Added events to the chart as well as data, now you can add callbacks to data click, chart mouse over, etc. requested by Tropicalista and pehrlich

Also added a better project page:
http://jettro.github.io/c3-angular-directive/

Working on improved documentation and better examples for release 0.4.0

### 0.3.0
Upgraded to the latest versions of:
c3js - 0.4.10

Added a number of pull requests by:
mark-lai: formatting and x/y tick enhancements
yourivdlans: Some very nice enhancements in the axis, also the sample with the bubble.
Resseguie: Added a feature to pass a color function to the chart
