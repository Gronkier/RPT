'use strict';

var headsupControllers = angular.module('headsupControllers', []);

headsupControllers.controller('headsupController', ['$scope', 'headsupService', 'commonService',
	function($scope, headsupService, commonService) {

		$scope.getYears =  function() {
			commonService.years(function(data) {
				$scope.years = data;
				$scope.yearSelected = $scope.years[0];
			});
		};

		$scope.getHeadsups =  function() {
			headsupService.headsups($scope.yearSelected,function(data) {
				$scope.headsups = data;
			});
		};



		$scope.getYearSelectedLabel = function() {
			return $scope.yearSelected;
		};
		$scope.getYearSelectedValue = function(stat) {
			return $scope.yearSelected;
		};


		//Init
		$scope.orderProp = 'points1+points2';
		$scope.getYears();
		$scope.getHeadsups();

		//Events
		$scope.onchange = function(year) {
			$scope.yearSelected = year;
			$scope.getHeadsups();
		};

	}]);
