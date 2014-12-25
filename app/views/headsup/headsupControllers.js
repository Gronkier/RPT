'use strict';

var headsupControllers = angular.module('headsupControllers', []);

headsupControllers.controller('headsupController', ['$scope', 'headsupService', 'commonService',
	function($scope, headsupService, commonService) {

		$scope.getYears =  function() {
			commonService.years(function(data) {
				$scope.years = data;
				$scope.yearFromSelected = $scope.years[0];
				$scope.yearToSelected = $scope.years[$scope.years.length-1];
			});
		};

		$scope.getHeadsups =  function() {
			headsupService.headsups($scope.yearFromSelected, $scope.yearToSelected,function(data) {
				$scope.headsups = data;
			});
		};



		$scope.getYearFromSelectedLabel = function() {
			return $scope.yearFromSelected;
		};
		$scope.getYearFromSelectedValue = function(stat) {
			return $scope.yearFromSelected;
		};
		$scope.getYearToSelectedLabel = function() {
			return $scope.yearToSelected;
		};
		$scope.getYearToSelectedValue = function(stat) {
			return $scope.yearToSelected;
		};


		//Init
		$scope.orderProp = 'points1+points2';
		$scope.getYears();
		$scope.getHeadsups();

		//Events
		$scope.onchangeYearFrom = function(year) {
			$scope.yearFromSelected = year;
			$scope.getHeadsups();
		};
		$scope.onchangeYearTo = function(year) {
			$scope.yearToSelected = year;
			$scope.getHeadsups();
		};

	}]);
