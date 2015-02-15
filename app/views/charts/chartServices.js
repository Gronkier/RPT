'use strict';

var serviceChart = angular.module('chartServices', []);
var port = '';
//var port = '3003';

serviceChart.factory('chartService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();
  //var year = new Date().getFullYear();
  return { 
        yearCharts: function(year, callback) {
            $http({ method: 'GET', 
              //url: 'http://localhost:3003/api/players/:y'
              url: protocol.concat(host,':', port, '/api/charts/', year)
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
