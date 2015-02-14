'use strict';

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerController', ['$scope', 'playerService',
    function($scope, playerService) {
      
      	$scope.getPlayers =  function() {
            playerService.yearPlayers($scope.year, function(data) { 
                $scope.players = data;
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
        $scope.getTrend = function(num) {
            if(num>0) {
                var trend = ($scope.players[num].pointsTot - $scope.players[num].pointsPrev) - ($scope.players[num-1].pointsTot - $scope.players[num-1].pointsPrev);
                if (trend > 0)
                    return 1;
                if (trend < 0)
                    return -1;
            }
            return 0;
        };

    // $scope.setImage = function(imageUrl) {
    //   $scope.mainImageUrl = imageUrl;
    // };

        $scope.year = new Date().getFullYear();
        $scope.getPlayers();
	
}]);

