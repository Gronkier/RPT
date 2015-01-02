'use strict';

var tournamentControllers = angular.module('tournamentControllers', []);

tournamentControllers.controller('tournamentController', ['$scope', 'tournamentService', 'commonService',
	function($scope, tournamentService, commonService) {

		$scope.getYears =  function() {
			commonService.years(function(data) {
				$scope.years = data;
				$scope.yearSelected = $scope.years[$scope.years.length-1];
			});
		};

		$scope.getYearTournaments =  function() {
			tournamentService.yearTournaments($scope.yearSelected, function(data) {
				$scope.tournaments = data;
			});
		};

		$scope.getYearSelectedLabel = function() {
			return $scope.yearSelected;
		};
		$scope.getYearSelectedValue = function(stat) {
			return $scope.yearSelected;
		};

		//Init
		$scope.getYears();
		$scope.getYearTournaments();

		//Events
		$scope.onchange = function(year) {
			$scope.yearSelected = year;
			$scope.getYearTournaments();
		};

	}]);
