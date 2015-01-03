'use strict';

var tournamentEditControllers = angular.module('tournamentEditControllers', []);

tournamentEditControllers.controller('tournamentEditController', ['$scope', '$location', 'tournamentService', 'commonService',
	function($scope, $location, tournamentService, commonService) {


		$scope.getYearTournaments =  function() {
			tournamentService.yearTournaments($scope.yearSelected, function(data) {
				$scope.tournaments = data;
			});
		};

		$scope.getTournamentById =  function() {
			var url = $location.url();
			tournamentService.yearTournaments($scope.yearSelected, function(data) {
				$scope.tournaments = data;
			});
		};
		$scope.getTournamentById =  function() {
			tournamentService.yearTournaments($scope.yearSelected, function(data) {
				$scope.tournaments = data;
			});
		};


		//Init
		$scope.getTournamentById();
		$scope.getYearTournaments();

		//Events
		$scope.saveTournament = function() {
			//save tournamentService.save();
			$location.path( '/tournaments' );
		};
		$scope.cancel = function(tournamentId) {
			$location.path( '/tournaments' );
		};
	}]);
