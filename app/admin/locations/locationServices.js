'use strict';

var serviceLocation = angular.module('locationServices', []);
var port = '';
var port = '3003';

serviceLocation.factory('locationService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();
  //var year = new Date().getFullYear();
  return {
        locations: function(year, callback) {
            $http({ method: 'GET', 
              //url: 'http://localhost:3003/api/players/:y'
              url: protocol.concat(host,':', port, '/tournament-locations')
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
