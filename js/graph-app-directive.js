var sampleApp = angular.module('sampleApp', []);

sampleApp.directive('outer', function() {
	
	var outerCtrl = function($scope) {
		console.log("Outer controller");

		this.tryMe = function() {
			console.log("outer controller: " + $scope.message);
		};

		this.setMessage = function(message) {
			$scope.message = message;
		};
	};

	var outerLinker = function(scope,element,attrs,outerCtrl) {
		console.log("Outer linker");
		scope.message = "Hello from outer linker";
		console.log("outer linker: " + scope.message);
		outerCtrl.tryMe();
	};

	return {
		"restrict": "E",
		"scope": {},
		"template":"<div class='outer'><div class='title'>The title</div><div ng-transclude></div></div>",
		"replace":true,
		"transclude":true,
		"controller": outerCtrl,
		"link": outerLinker
	}
});

sampleApp.directive('inner', function() {
	var innerLinker = function(scope,element,attrs,outerCtrl) {
		console.log("Inner linker");
		outerCtrl.setMessage(attrs['message']);
		outerCtrl.tryMe();
	};

	return {
		"require":"^outer",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"transclude":true,
		"template":"<div ng-transclude></div>",
		"link": innerLinker
	}
});

sampleApp.directive('moreinner', function() {
	var moreinnerLinker = function(scope,element,attrs,outerCtrl) {
		console.log("More Inner linker");
		outerCtrl.setMessage(attrs['message']);
		outerCtrl.tryMe();
	};

	return {
		"require":"^outer",
		"restrict":"E",
		"scope": {},
		"replace":true,
		"link": moreinnerLinker
	}
});


sampleApp.controller('SampleCtrl', function ($scope) {
	console.log("Main controller");
});