'use strict';

var serviceHeadsup = angular.module('headsupServices', []);
var port = '';
//var port = '3003';

serviceHeadsup.factory('headsupService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();

  return {
    headsups: function(year, callback) {
      $http({ method: 'GET',
        //url: 'http://localhost:3003/api/headsups'
        url: protocol.concat(host,':', port, '/api/headsups')
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

