// public/core.js
var statControllers = angular.module('tournamentControllers', []);



statControllers.controller('tournamentListCtrl', ['$scope', '$http',
  function($scope, $http) {
    //$http.get('http://localhost:3000\stats\2014\2014\pointsTot?callback=JSON_CALLBACK')
	//$http.get('http://localhost:3000\statS\2014\2014\POINTSTOT')
	$http({	method: 'GET', 
			url: 'http://localhost:3000/stats/2014/2014/pointsTot' /*'http://localhost:3000\stats',
			params: {yFrom: 2014, yTo: 2014, type: 'pointsTot' }*/
			})
		.success(function(data) {
			$scope.stats = data.stats;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
    $scope.orderProp = 'pointsTot';
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