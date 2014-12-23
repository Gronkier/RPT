'use strict';

// Angular module, defining routes for the app
angular.module('rptApp', [
	'ngRoute',
	'navbarControllers',

	'playerServices',
	'statServices',
	'headsupServices',
	'tournamentServices',
	'commonServices',

	'playerControllers',
	'statControllers',
	'headsupControllers',
	'tournamentControllers',
	'seasonControllers'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/players', { 
				templateUrl: 'views/players/players.html', 
				controller: 'playerController'  
				})
			.when('/stats', { 
				templateUrl: 'views/stats/stats.html',
				controller: 'statController'
				})
			.when('/headsup', {
				templateUrl: 'views/headsup/headsup.html',
				controller: 'headsupController'
			})
			.when('/tournaments', { 
				templateUrl: 'views/tournaments/tournaments.html', 
				controller: 'tournamentController'
				})
			 .when('/seasons', {
			 templateUrl: 'views/seasons/seasons.html',
			 controller: 'seasonController'
		 })/*
			.when('/tournament/:tournamentId', {
				templateUrl: 'views/tournamentEdit.html',
				controller: tournamentEditCtrl  
				})*/
			// If invalid route, just redirect to the main list view
			.otherwise({ 
				redirectTo: '/players'
				});
	}]);