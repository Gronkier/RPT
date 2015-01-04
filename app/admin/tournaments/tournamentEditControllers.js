'use strict';

var tournamentEditControllers = angular.module('tournamentEditControllers', []);

tournamentEditControllers.controller('tournamentEditController', ['$scope', '$location', 'tournamentService', 'playerService', 'locationService', 'commonService',
	function($scope, $location, tournamentService, playerService, locationService, commonService) {


		$scope.init =  function() {
			locationService.locations(function(data) {
				$scope.locations = data;
			});
			playerService.players(function(data) {
				$scope.players = data;
			});
			tournamentService.newId(function(data) {
				$scope.newId = data;
				$scope.getEditTournament();
			});
		};
		$scope.getEditTournament =  function() {
			tournamentService.editTournament(function(data) {
				$scope.editTournament = data;
			});
		};

		$scope.saveTournament =  function() {
			tournamentService.saveTournament($scope.editTournament, function(data) {
				$location.path( '/tournaments' );
			});
		};


		//Init
		$scope.init();

		//Events
		$scope.saveTournament = function() {
			$scope.saveTournament();
		};
		$scope.cancel = function(tournamentId) {
			$location.path( '/tournaments' );
		};
	}]);
