var statControllers = angular.module('statControllers', []);

statControllers.controller('StatListCtrl', ['$scope', '$http', '$location'
  function($scope, $http) {
	$http({	method: 'GET', 
			url: 'http://'.concat($location.host(), ':3003/api/stats/2014/2014/pointsTot') //'http://localhost:3000/stats',
			//params: {yFrom: 2014, yTo: 2014, type: 'pointsTot' }*/
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
