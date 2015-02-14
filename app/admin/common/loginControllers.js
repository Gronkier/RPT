'use strict';

var loginControllers = angular.module('loginControllers', []);

loginControllers.controller('loginController', ['$scope', '$location', 'loginService','$http', '$window',
    function($scope, $location, loginService, $http, $window) {

        $scope.user = {username: '', password: ''};
        $scope.submit = function(){
                loginService.tryLogin($scope.user, function(data) {
                $scope.message = data;
                    if($scope.message=='Welcome')
                        $location.path( '/tournaments' );
                    else
                        $scope.message = 'Errore utente o password'
            });
        }
}]);