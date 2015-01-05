'use strict';

var tournamentControllers = angular.module('tournamentControllers', []);

tournamentControllers.controller('tournamentController', ['$scope', '$location', 'tournamentService', 'commonService',
	function($scope, $location, tournamentService, commonService) {

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


		$scope.editTournament = function(tournamentId) {
			if(tournamentId) {
				tournamentService.tournamentById(tournamentId, function (data) {
					if (data.length > 0) {
						$location.path('/tournamentEdit');
					}
				});
			}
			else
			{
				tournamentService.newTournament(function (data) {
					if (data) {
						$location.path('/tournamentEdit');
					}
				});

			}
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
