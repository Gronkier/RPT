'use strict';

var statControllers = angular.module('statControllers', []);

statControllers.controller('statController', ['$scope', 'statService',
    function($scope, statService) {
      
      	 $scope.getStats =  function() {
            statService.stats($scope.yFrom, $scope.yTo, $scope.type, function(data) { 
                $scope.stats = data;
                });
        };

    // $scope.setImage = function(imageUrl) {
    //   $scope.mainImageUrl = imageUrl;
    // };

        $scope.orderProp = 'pointsTot';
        $scope.yFrom = new Date().getFullYear();
        $scope.yTo = $scope.yFrom;
        $scope.type = 'pointsTot';
        $scope.getStats();
	
}]);
















// statControllers.controller('StatListCtrl', ['$scope', '$http', '$location',
//   function($scope, $http, $location) {
// 	//init controller scope
// 	$scope.yFrom = new Date().getFullYear();
// 	$scope.yTo = $scope.yFrom ;
// 	$scope.orderProp = 'pointsTot';
	
	
// 	//$scope.getCurrentStats = function() {
//     //    getApiStats($scope, $http);
//     //};
	
// 	var protocol = $location.protocol().concat('://');
// 	var host = $location.host();
// 	$http({	method: 'GET', 
// 			//url: 'http://localhost:3003/api/stats/2014/2014/pointsTot' //'http://localhost:3000/stats',
			
// 			url: protocol.concat(host,':3003/api/stats/',$scope.yFrom, '/',$scope.yTo,'/',$scope.orderProp)
// 			//params: {"yFrom": '2014', "yTo": '2014', "type": 'pointsTot' }
// 			})
// 		.success(function(data) {
// 			$scope.stats = data;
// 			console.log(data);
// 		})
// 		.error(function(data) {
// 			console.log('Error: ' + data);
// 		});
	
    
//   }]);
  
  
