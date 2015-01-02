'use strict';

var navbarControllers = angular.module('navbarControllers', []);

navbarControllers.controller('navbarController', ['$scope', '$location',
    function($scope, $location)
    {
        //Hamburger menu toggle
        $(".navbar-nav li a").click(function (event) {
            // check if window is small enough so dropdown is created
            var toggle = $(".navbar-toggle").is(":visible");
            if (toggle) {
                $(".navbar-collapse").collapse('hide');
            }
        });

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
