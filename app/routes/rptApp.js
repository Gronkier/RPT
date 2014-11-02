'use strict';

// Angular module, defining routes for the app
angular.module('rptApp', ['ngRoute','statControllers'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/stats', { 
				templateUrl: 'views/statList.html', 
				controller: 'StatListCtrl'
				})
			/*.when('/players', { 
				templateUrl: 'views/playerList.html', 
				controller: playerListCtrl  
				})
			.when('/player/:playerId', { 
				templateUrl: 'views/playerEdit.html', 
				controller: playerEditCtrl  
				})
			.when('/tournaments', { 
				templateUrl: 'views/tournamentList.html', 
				controller: tournamentListCtrl  
				})
			.when('/tournament/:tournamentId', { 
				templateUrl: 'views/tournamentEdit.html', 
				controller: tournamentEditCtrl  
				})*/
			// If invalid route, just redirect to the main list view
			.otherwise({ redirectTo: '/stats' });
	}]);