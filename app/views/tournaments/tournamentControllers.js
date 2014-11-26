'use strict';

var tournamentControllers = angular.module('tournamentControllers', []);

tournamentControllers.controller('tournamentController', ['$scope', 'tournamentServices',
	function($scope, tournamentServices) {

		$scope.getYearTournaments =  function() {
			tournamentServices.yearTournaments($scope.year, function(data) {
				$scope.tournaments = data;
			});
		};

		$scope.getLastTournament =  function() {
			tournamentServices.lastTournament(function(data) {
				$scope.lastTournament = data;
			});
		};

		// $scope.setImage = function(imageUrl) {
		//   $scope.mainImageUrl = imageUrl;
		// };

		$scope.year = new Date().getFullYear();
		$scope.getLastTournament();

	}]);



 /* 
statControllers.controller('tournamentEditCtrl', ['$scope', 'Stats',
  function($scope, Stats) {
    $scope.stats = Stats.query();
    $scope.orderProp = 'pointsTot';
  }]);  
  

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
*/