'use strict';

var loginControllers = angular.module('loginControllers', []);

loginControllers.controller('loginController', ['$scope', 'loginService','$http', '$window',
    function($scope, loginService, $http, $window) {

        $scope.user = {username: 'john.doe', password: 'foobar'};
        loginService.tryLogin($scope.user, function(data) {
            $location.path( '/tournaments' );
        });


        $scope.message = '';
        $scope.submit = function () {
            $http
                .post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.message = 'Welcome';
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;

                    // Handle login errors here
                    $scope.message = 'Error: Invalid user or password';
                });
        };
	
}]);