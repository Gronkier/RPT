'use strict';

var serviceLocation = angular.module('locationServices', []);
var port = '';
//var port = '3003';
var newLocations = [];

serviceLocation.factory('locationService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();
  var i;
  //var year = new Date().getFullYear();
  return {
        locations: function(callback) {
            $http({ method: 'GET', 
              //url: 'http://localhost:3003/api/players/:y'
              url: protocol.concat(host,':', port, '/api/tournament-locations')
              })
              .success(function(data) {
                console.log(data);
                for(i=0; i<newLocations.length; i++) {
                  data.push(newLocations[i]);
                }
                callback(data);  
              })
              .error(function(data) {
                console.log('Error: ' + data);
                callback(data);
              });
        },
        addLocation: function(newLocation) {
          if (newLocation) {
            if(newLocations.indexOf(newLocation)== -1){
              newLocations.push(newLocation);
            }
          }
        }
  }}]);
