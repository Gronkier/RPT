'use strict';

// Angular module, defining routes for the app
angular.module('rptApp', [
	'ngRoute',
    'chart.js',
	'navbarControllers',

	'playerServices',
	'statServices',
    'chartServices',
	'headsupServices',
	'tournamentServices',
	'commonServices',

	'playerControllers',
	'statControllers',
    'chartControllers',
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
            .when('/charts', {
                templateUrl: 'views/charts/charts.html',
                controller: 'chartController'
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
		    })
		    // If invalid route, just redirect to the main list view
            .otherwise({
            redirectTo: '/players'
            });
	}]);