'use strict';

var serviceTournament = angular.module('tournamentServices', []);
var port = '';
var port = '3003';

serviceTournament.factory('tournamentService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();
  //var year = new Date().getFullYear();
  return {
      yearTournaments: function(year, callback) {
      $http({ method: 'GET',
        //url: 'http://localhost:3003/api/tournaments/:y'
        url: protocol.concat(host,':', port, '/api/tournaments/', year)
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

      finalYearTournament: function(year, callback) {
      $http({ method: 'GET',
        //url: 'http://localhost:3003/api/tournament'
        url: protocol.concat(host,':', port, '/api/tournament-final/', year)
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










//   firstModule.factory( 'katTplLoadingService', function ($http) {
//     return {
//         fn: function(code, callback) { //note the callback argument
//             $http.get("${createLink(controller:'kats', action:'loadBreedInfo')}",
//             params:{code: code}) //place your code argument here
//                 .success(function (template, status, headers, config) {
//                     callback(template); //pass the result to your callback
//                 });
//         };
//     };
// });


// $scope.loadBreedData = function() {
//     katTplLoadingService.fn($scope.breed.code, function(tmpl) { //note the tmpl argument
//         $scope.template = tmpl;
//     });
// }





// angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

//     return {
//         // call to get all nerds
//         get : function() {
//             return $http.get('/api/nerds');
//         },


//                 // these will work when more API routes are defined on the Node side of things
//         // call to POST and create a new nerd
//         create : function(nerdData) {
//             return $http.post('/api/nerds', nerdData);
//         },

//         // call to DELETE a nerd
//         delete : function(id) {
//             return $http.delete('/api/nerds/' + id);
//         }
//     }

// }]);
