'use strict';

// Angular module, defining routes for the app
angular.module('rptApp', [
	'ngRoute',
	'navbarControllers',
	'playerServices',
	'statServices',
	'playerControllers',
	'statControllers',
	'tournamentServices',
	'tournamentControllers'
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
			.when('/tournaments', { 
				templateUrl: 'views/tournaments/tournaments.html', 
				controller: 'tournamentController'
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