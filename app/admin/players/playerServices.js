'use strict';

var servicePlayer = angular.module('playerServices', []);
var port = '';
var port = '3003';

servicePlayer.factory('playerService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();
  //var year = new Date().getFullYear();
  return {
        players: function(callback) {
            $http({ method: 'GET', 
              //url: 'http://localhost:3003/api/players/:y'
              url: protocol.concat(host,':', port, '/api/players')
              })
              .success(function(data) {
                console.log(data);
                callback(data);  
              })
              .error(function(data) {
                console.log('Error: ' + data);
                callback(data);
              });
        }
  }}]);
