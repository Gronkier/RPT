'use strict';

var headsupControllers = angular.module('headsupControllers', []);

headsupControllers.controller('headsupController', ['$scope', 'headsupService',
	function($scope, headsupService) {

		$scope.getHeadsups =  function() {
			headsupService.headsups(function(data) {
				$scope.headsups = data;
			});
		};

		$scope.orderProp = 'points1+points2';
		$scope.getHeadsups();

	}]);



 /* 
statControllers.controller('headsupEditCtrl', ['$scope', 'Stats',
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