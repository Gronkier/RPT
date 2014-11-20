'use strict';

var navbarControllers = angular.module('navbarControllers', []);

navbarControllers.controller('navbarController', ['$scope', '$location',
    function($scope, $location)
    {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
