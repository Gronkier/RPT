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
			$scope.getEditTournament();
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


		//Init
		$scope.init();

		//Events
		$scope.saveTournament = function() {
			tournamentService.saveTournament($scope.editTournament, function(data) {
				$location.path( '/tournaments' );
			});
		};

		$scope.cancel = function() {
			$location.path( '/tournaments' );
		};

		$scope.newResult = function() {
			var newResult = {
				"player_id": "",
				"pos": $scope.editTournament.results.length+1,
				"points": 0,
				"money": 0,
				"pay": 5
			};
			$scope.editTournament.results.push(newResult);
		};

		$scope.removeResult = function(result) {
			if (result) {
				var ind = $scope.editTournament.results.indexOf(result);
				if(ind != -1){
					$scope.editTournament.results.splice(ind,1);
				}
			}
		};

		$scope.calculate = function() {
            var i =0;
            if($scope.editTournament.results.length > 0) {
                var TotalPay = 0;
                for (i = 0; i < $scope.editTournament.results.length; i++) {
                    TotalPay = TotalPay + $scope.editTournament.results[i].pay;
                }

                for (i = 0; i < $scope.editTournament.results.length; i++) {
                    var player = $scope.editTournament.results[i];
                    player.points = TotalPay / player.pos * 10 * 1.25;
                }
            }
		};

		$scope.deleteTournament = function() {
			tournamentService.deleteTournament($scope.editTournament, function(data) {
				$location.path( '/tournaments' );
			});
		};
	}]);
