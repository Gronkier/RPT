'use strict';

var loginControllers = angular.module('loginControllers', []);

loginControllers.controller('loginController', ['$scope', '$location', 'loginService','$http', '$window',
    function($scope, $location, loginService, $http, $window) {

        $scope.user = {username: 'john.doe', password: 'foobar'};
        loginService.tryLogin($scope.user, function(data) {
            $scope.message = data;
            $location.path( '/tournaments' );
        });
}]);