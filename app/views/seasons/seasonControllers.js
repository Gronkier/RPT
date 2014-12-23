'use strict';

var seasonControllers = angular.module('seasonControllers', []);

seasonControllers.controller('seasonController', ['$scope', 'tournamentService', 'playerService', 'commonService',
	function($scope, tournamentService, playerService, commonService) {

		$scope.getYears =  function() {
			commonService.years(function(data) {
				$scope.years = data;
				$scope.yearSelected = $scope.years[0];
			});
		};

		$scope.getFinalYearTournament =  function() {
			tournamentService.finalYearTournament($scope.yearSelected, function(data) {
				$scope.finalTournament = data[0];
			});
		};

		$scope.getPlayers =  function() {
			playerService.yearPlayers($scope.yearSelected, function(data) {
				$scope.players = data;
			});
		};



		$scope.getNumber = function(num) {
			if (num > 0)
				return new Array(num);
			return [];
		};
		$scope.getNumberGold = function(num) {
			var gold = Math.floor(num / 10);
			return new Array(gold);
		};
		$scope.getNumberSilver = function(num) {
			var silver = Math.floor((num - Math.floor(num / 10)*10)/5);
			return new Array(silver);
		};
		$scope.getNumberBronze = function(num) {
			var bronze = (num - Math.floor(num / 10)*10 -Math.floor((num - Math.floor(num / 10)*10)/5)*5);
			return new Array(bronze);
		};


		$scope.getYearSelectedLabel = function() {
			return $scope.yearSelected;
		};
		$scope.getYearSelectedValue = function(stat) {
			return $scope.yearSelected;
		};

		//Init
		$scope.getYears();
		$scope.getFinalYearTournament();
		$scope.getPlayers();

		//Events
		$scope.onchange = function(year) {
			$scope.yearSelected = year;
			$scope.getFinalYearTournament();
			$scope.getPlayers();
		};

	}]);


