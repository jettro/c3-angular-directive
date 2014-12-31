var graphApp = angular.module('graphApp', ['gridshore.c3js.chart','graphApp.services']);

graphApp.controller('GraphCtrl', function ($scope, $interval,dataService) {
	$scope.datapoints=[];
	$scope.datacolumns=[{"id":"top-1","type":"line","name":"Top one"},
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