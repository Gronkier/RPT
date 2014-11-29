'use strict';

var statControllers = angular.module('statControllers', []);

statControllers.controller('statController', ['$scope', 'statService',
    function($scope, statService) {
      
      	 $scope.getStats =  function() {
            statService.stats($scope.yFrom, $scope.yTo, $scope.type, function(data) { 
                $scope.stats = data;
                });
        };



        $scope.getStatTypes =  function() {
            statService.statTypes(function(data) {
                $scope.statTypes = data;
                $scope.statTypeSelected = $scope.statTypes[0];
            });
        };



        $scope.getNumber = function(num) {
            if (num > 0)
                return new Array(num);
            return [];
        };
        $scope.getNumberGold = function(num) {
            var gold = Math.floor(num / 10);
            return new Array(gold);
        };
        $scope.getNumberSilver = function(num) {
            var silver = Math.floor((num - Math.floor(num / 10)*10)/5);
            return new Array(silver);
        };
        $scope.getNumberBronze = function(num) {
            var bronze = (num - Math.floor(num / 10)*10 -Math.floor((num - Math.floor(num / 10)*10)/5)*5);
            return new Array(bronze);
        };

        $scope.getSelectedLabel = function() {
            return $scope.statTypeSelected.label;
        };

        $scope.getSelectedValue = function(stat) {
            $scope.currentStat = stat;
            var valnum = $scope.$eval('currentStat.' + $scope.statTypeSelected.type);
            var index = $scope.stats.indexOf(stat);
            return valnum.toFixed(2);
        };

        //$scope.getOrderIndex = function(stat) {
        //    var index = $scope.stats.indexOf(stat);
        //    return index+1;
        //};

        // $scope.setImage = function(imageUrl) {
        //   $scope.mainImageUrl = imageUrl;
        // };

        $scope.yFrom = new Date().getFullYear();
        $scope.yTo = $scope.yFrom;
        $scope.type = 'pointsTot';
        $scope.getStats();
        $scope.getStatTypes();


        $scope.onchange = function(type) {
           // $scope.statTypeSelected = type;
        };
        //$scope.orderProp =  $scope.statTypes[0];
	
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
  
  
