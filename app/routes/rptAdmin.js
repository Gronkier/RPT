'use strict';

// Angular module, defining routes for the app
angular.module('rptAdmin', [
	'ngRoute',
	'navbarControllers',

	'playerServices',
	'newServices',
	'locationServices',
	'tournamentServices',
	'commonServices',

	'playerControllers',
	'newControllers',
	'locationControllers',
	'tournamentControllers'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/tournaments', {
				templateUrl: 'admin/tournaments/tournaments.html',
				controller: 'tournamentController'
			})
			.when('/tournamentNew', {
				templateUrl: 'admin/tournaments/tournamentEdit.html',
				controller: 'tournamentController'
			})
			.when('/tournamentEdit/id', {
				templateUrl: 'admin/tournaments/tournamentEdit.html',
				controller: 'tournamentController'
			})
			.when('/players', { 
				templateUrl: 'admin/players/players.html',
				controller: 'playerController'
				})
			.when('/locations', {
				templateUrl: 'admin/locations/locations.html',
				controller: 'locationController'
				})
			.when('/news', {
				templateUrl: 'admin/news/news.html',
				controller: 'newController'
		 	})
			// If invalid route, just redirect to the main list view
			.otherwise({ 
				redirectTo: '/tournaments'
				});
	}]);