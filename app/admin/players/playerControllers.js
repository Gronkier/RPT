'use strict';

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerController', ['$scope', 'playerService',
    function($scope, playerService) {

        $scope.getPlayers =  function() {
            playerService.players(function(data) {
                $scope.players = data;
            });
        };
        $scope.addPlayer =  function() {
            if ($scope.newPlayer) {
                if($scope.players.indexOf($scope.newPlayer)== -1){
                    $scope.players.push($scope.newPlayer);
                    playerService.addPlayer($scope.newPlayer);
                }
            }
        };

        $scope.newLocation;

        //init
        $scope.getPlayers();
	
}]);

