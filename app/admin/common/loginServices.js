'use strict';

var serviceLogin = angular.module('loginServices', []);
var port = '';
//var port = '3003';

serviceLogin.factory('loginService', ['$http', '$location', '$window', function($http, $location, $window){

    var protocol = $location.protocol().concat('://');
    var host = $location.host();
    var authorization = false;

    return {
        tryLogin: function(user, callback) {
            $http({   method: 'POST',
                //url: 'http://localhost:3003/api/tournament'
                url: protocol.concat(host,':', port, '/api/authenticate'),
                data:user
            })
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    authorization = true;
                    callback('Welcome');
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    authorization = false;
                    callback('Error');
                });
        },

        isAuthorized: function() {
            return authorization;
        }
    };
}]);

serviceLogin.factory('tokenService', ['$rootScope', '$q', '$window', function($rootScope, $q, $window){
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        },

    };
}]);

serviceLogin.config(function ($httpProvider) {
    $httpProvider.interceptors.push('tokenService');
});