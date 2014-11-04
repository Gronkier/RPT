var statControllers = angular.module('statControllers', []);

statControllers.controller('StatListCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
	//init controller scope
	$scope.yFrom = new Date().getFullYear();
	$scope.yTo = $scope.yFrom ;
	$scope.orderProp = 'pointsTot';
	
	
	//$scope.getCurrentStats = function() {
    //    getApiStats($scope, $http);
    //};
	
	var protocol = $location.protocol().concat('://');
	var host = $location.host();
	$http({	method: 'GET', 
			//url: 'http://localhost:3003/api/stats/2014/2014/pointsTot' //'http://localhost:3000/stats',
			
			url: protocol.concat(host,'/api/stats/',$scope.yFrom, '/',$scope.yTo,'/',$scope.orderProp)
			//params: {"yFrom": '2014', "yTo": '2014', "type": 'pointsTot' }
			})
		.success(function(data) {
			$scope.stats = data.stats;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
    
  }]);
  
  
