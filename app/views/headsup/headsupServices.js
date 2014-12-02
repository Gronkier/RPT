'use strict';

var serviceHeadsup = angular.module('headsupServices', []);
var port = '';
//var port = '3003';

serviceHeadsup.factory('headsupService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();

  return {
    headsups: function(callback) {
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
