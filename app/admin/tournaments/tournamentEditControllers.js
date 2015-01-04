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

		$scope.finalValues = [
			{
				value:0,
				label:'No'
			},
			{
				value:1,
				label:'Si'
			}];

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

		$scope.newResult = function() {
			var newResult = {
				"player_id": "",
				"pos": $scope.editTournament.results+1,
				"points": 0,
				"money": 0,
				"pay": 5
			};
			$scope.editTournament.results.push(newResult);
		};

		$scope.removeResult = function(result) {
			if (result) {
				var index = $scope.editTournament.results.indexOf(result);
				if(index != -1){
					$scope.editTournament.results.splice(index,1);
				}
			}
		};
	}]);
