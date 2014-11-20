'use strict';

/* Services */

var dbTournamentServices = angular.module('tournamentServices', ['ngResource']);

dbTournamentServices.factory('tournamentsService', ['$resource',
  function($resource){
    return $resource('api/tournaments', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);



