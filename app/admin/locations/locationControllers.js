'use strict';

var locationControllers = angular.module('locationControllers', []);

locationControllers.controller('locationController', ['$scope', 'locationService',
    function($scope, locationService) {
      
      	$scope.getPlayers =  function() {
            locationService.yearPlayers($scope.year, function(data) {
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

    // $scope.setImage = function(imageUrl) {
    //   $scope.mainImageUrl = imageUrl;
    // };

        $scope.year = new Date().getFullYear();
        $scope.getPlayers();
	
}]);

