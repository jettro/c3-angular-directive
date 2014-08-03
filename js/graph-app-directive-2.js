var graphApp = angular.module('graphApp', ['graphApp.services']);


graphApp.directive('charttimeseries', function($timeout,dataService) {
	var linker = function(scope,element,attrs) {
		scope.chart = null;
		scope.data = [];
		
		scope.keepLoading = false;

		function showGraph() {
			var config = {};
			config.bindto = '#chart';
			config.data = {};
			config.data.keys = loadKeys();
			config.data.json = scope.data;
			config.axis = {};
			config.axis.x = {"type":"timeseries","tick":{"format":"%S"}};
			config.axis.y = {"label":{"text":"Number of items","position":"outer-middle"}};
			config.data.types=loadTypes();
			scope.chart = c3.generate(config);	
		}

		scope.stopLoading = function() {
			scope.keepLoading = false;
		}

		scope.startLoading = function() {
			scope.keepLoading = true;
			scope.loadNewData();
		}

		scope.loadNewData = function() {
			dataService.loadData(function(newData) {
				var data = {};
				data.keys = loadKeys();
				data.json = newData;
				scope.chart.load(data);
				$timeout(function(){
					if (scope.keepLoading) {
						scope.loadNewData()				
					}
				},1000);			
			});
		}

		function loadKeys() {
			// TODO validate input, what if one of the properties is not provided
			var x = attrs['propX'];
			var y = attrs['propsY'].split(",");
			return {"x":x,"value":y};
		}

		function loadTypes() {
			// TODO validate input, what if one of the properties is not provided
			var values = attrs['propsY'].split(",");
			var types = attrs['types'].split(",");

			var counter=0;
			var response={};
			while (counter < values.length) {
				response[values[counter]]=types[counter];
				counter++;
			}
			return response;
		}

		showGraph();
	};

	return {
		"restrict": "E",
		"template":"<div><div id='chart'></div><button ng-click='startLoading()'>Start loading</button><button ng-click='stopLoading()'>Stop loading</button></div>",
		"replace":true,
		"link": linker
	}
});

graphApp.controller('GraphCtrl', function ($scope,dataService) {
	$scope.serviceConfig = {"maxPoints":60,"maxNumber":200};

	$scope.$watch('serviceConfig.maxPoints',changeServiceConfig);
	$scope.$watch('serviceConfig.maxNumber',changeServiceConfig);

	function changeServiceConfig() {
		dataService.configure($scope.serviceConfig);
	}
});

var services = angular.module('graphApp.services', []);

// Returns datapoints in the format of {x,y1,y2,y...}
services.factory('dataService', function() {
	function DataService() {
		var data = [];
		var numDataPoints = 60;
		var maxNumber = 200;

		// API methods
		this.loadData = function(callback) {
			if (data.length >= numDataPoints) {
				var toMany = data.length - numDataPoints + 1;
				data.splice(0,toMany);
			}
			data.push({"x":new Date(),"top-1":randomNumber(),"top-2":randomNumber()});
			callback(data);
		};

		// Other methods
		this.configure = function(config) {
			numDataPoints = config.maxPoints;
			maxNumber = config.maxNumber;
		};

		function randomNumber() {
			return Math.floor((Math.random() * maxNumber) + 1);
		}
	}
	return new DataService();
});