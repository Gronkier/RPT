'use strict';

var locationControllers = angular.module('locationControllers', []);

locationControllers.controller('locationController', ['$scope', 'locationService',
    function($scope, locationService) {
      
      	$scope.getLocations =  function() {
            locationService.locations(function(data) {
                $scope.locations = data;
            });
        };
        $scope.addLocation =  function() {
            if ($scope.newLocation) {
                if($scope.locations.indexOf($scope.newLocation)== -1){
                    $scope.locations.push($scope.newLocation);
                    locationService.addLocation($scope.newLocation);
                }
            }
        };

        $scope.newLocation;

        //init
        $scope.getLocations();
}]);

