'use strict';

var serviceTournament = angular.module('tournamentServices', []);
var port = '';
//var port = '3003';
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
              else
            {
                newId = currentYear*100 + 1;
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

      newTournament: function(callback) {
          var tournamentDate = new Date();
          tournamentDate.setHours(-tournamentDate.getTimezoneOffset()/60);
          tournamentDate.setMinutes(0);
          tournamentDate.setSeconds(0);
          tournamentDate.setMilliseconds(0);
          editTournament={
              "_id": newId,
              "year": tournamentDate.getFullYear(),
              "date": tournamentDate.toISOString(),
              //"date": tournamentDate,
              "details": {
                  "location": "",
                  "tables": 1,
                  "final": 0
              },
              "results": []
          };
          callback(editTournament);
      },

      editTournament: function(callback) {
          callback(editTournament);
      },

      saveTournament: function(tournament, callback) {
          $http({   method: 'POST',
                    //url: 'http://localhost:3003/api/tournament'
                    url: protocol.concat(host,':', port, '/adm/tournament-save/'),
                    data:tournament
          })
              .success(function(data) {
                  console.log(data);
                  callback(data);
              })
              .error(function(data) {
                  console.log('Error: ' + data);
                  callback(data);
              });
      },

      deleteTournament: function(tournament, callback) {
          $http({ method: 'POST',
              //url: 'http://localhost:3003/api/tournament'
              url: protocol.concat(host,':', port, '/adm/tournament-delete/'),
              data:tournament
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









