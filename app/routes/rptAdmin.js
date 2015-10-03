'use strict';

// Angular module, defining routes for the app
angular.module('rptAdmin', [
	'ngRoute',
	'navbarControllers',

    'loginServices',
	'playerServices',
	'newServices',
	'locationServices',
	'tournamentServices',
	'commonServices',
    'statServices',

    'loginControllers',
	'playerControllers',
	'newControllers',
	'locationControllers',
	'tournamentControllers',
	'tournamentEditControllers',
    'statControllers'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
            .when('/login', {
                templateUrl: 'admin/common/login.html',
                controller: 'loginController'
            })
			.when('/tournaments', {
				templateUrl: 'admin/tournaments/tournaments.html',
				controller: 'tournamentController'
			})
			.when('/tournamentEdit', {
				templateUrl: 'admin/tournaments/tournamentEdit.html',
				controller: 'tournamentEditController'
			})
			.when('/players', { 
				templateUrl: 'admin/players/players.html',
				controller: 'playerController'
            })
            .when('/playerEdit', {
                templateUrl: 'admin/players/playerEdit.html',
                controller: 'playerEditController'
            })
			.when('/locations', {
				templateUrl: 'admin/locations/locations.html',
				controller: 'locationController'
            })
			.when('/news', {
				templateUrl: 'admin/news/news.html',
				controller: 'newController'
		 	})
            .when('/stats', {
                templateUrl: 'admin/stats/stats.html',
                controller: 'statController'
            })
			// If invalid route, just redirect to the main list view
			.otherwise({ 
				redirectTo: '/login'
            });
	}]);