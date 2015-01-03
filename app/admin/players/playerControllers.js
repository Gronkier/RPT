'use strict';

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerController', ['$scope', 'playerService',
    function($scope, playerService) {

        $scope.getPlayers =  function() {
            playerService.players(function(data) {
                $scope.players = data;
            });
        };
        $scope.addPlayer =  function(player) {
            $scope.players.push(player);
        };


        //init
        $scope.getPlayers();
	
}]);

