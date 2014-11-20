'use strict';

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerController', ['$scope', 'playerService',
    function($scope, playerService) {
      
      	 $scope.getPlayers =  function() {
            playerService.yearPlayers($scope.year, function(data) { 
                $scope.players = data;
                });
        };

    // $scope.setImage = function(imageUrl) {
    //   $scope.mainImageUrl = imageUrl;
    // };
  	
  	    $scope.orderProp = 'pointsTot';
        $scope.year = new Date().getFullYear();
        $scope.getPlayers();
	
}]);

 



 // $scope.loadBreedData = function() {
//     katTplLoadingService.fn($scope.breed.code, function(tmpl) { //note the tmpl argument
//         $scope.template = tmpl;
//     });
// }