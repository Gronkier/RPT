'use strict';

var navbarControllers = angular.module('navbarControllers', []);

navbarControllers.controller('navbarController', ['$scope', '$location','loginService',
    function($scope, $location, loginService)
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


        $scope.isAuthorized = loginService.isAuthorized();
        $scope.isDisabled = !$scope.isAuthorized;
        $scope.getLink = function (link) {
            $scope.isAuthorized = loginService.isAuthorized();
            $scope.isDisabled = !$scope.isAuthorized;
            if($scope.isAuthorized ) {
                return link;
            }
            else {
                return "#";
            }
        };

    }]);
