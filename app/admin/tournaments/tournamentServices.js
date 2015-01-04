'use strict';

var serviceTournament = angular.module('tournamentServices', []);
var port = '';
var port = '3003';
var editTournament;
var newId;

serviceTournament.factory('tournamentService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();

  return {
      yearTournaments: function(year, callback) {
      $http({ method: 'GET',
        //url: 'http://localhost:3003/api/tournaments/:y'
        url: protocol.concat(host,':', port, '/api/tournaments/', year)
      })
          .success(function(data) {
            console.log(data);
            var currentYear = new Date().getFullYear();
            if (currentYear == year && data.length>0)
            {
                newId = data[0]._id + 1;
            }
            callback(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
            callback(data);
          });
      },

      tournamentById: function(id, callback) {
      $http({ method: 'GET',
        //url: 'http://localhost:3003/api/tournament'
        url: protocol.concat(host,':', port, '/api/tournament/', id)
      })
          .success(function(data) {
              console.log(data);
              if (data.length > 0) {
                editTournament = data[0];
              }
              callback(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
            callback(data);
          });
      },

      newId: function(callback) {
          callback(newId);
      },

      editTournament: function(callback) {
          callback(editTournament);
      },

      saveTournament: function(tournament, callback) {
          $http({ method: 'POST',
              //url: 'http://localhost:3003/api/tournament'
              url: protocol.concat(host,':', port, '/api/tournament-final/')
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









