'use strict';

var locationControllers = angular.module('locationControllers', []);

locationControllers.controller('locationController', ['$scope', 'locationService',
    function($scope, locationService) {
      
      	$scope.getLocations =  function() {
            locationService.locations(function(data) {
                $scope.locations = data;
                });
        };
        $scope.addLocations =  function(location) {
            $scope.locations.push(location);
        };


        //init
        $scope.getLocations();
}]);

