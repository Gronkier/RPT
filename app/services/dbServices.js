'use strict';

/* Services */

var dbServices = angular.module('dbServices', ['ngResource']);

dbServices.factory('Players', ['$resource',
  function($resource){
	var year = new Date().getFullYear();
    return $resource('/api/players/:year', {}, {
      query: {method:'GET', params:{year:year}, isArray:true}
    });
  }]);
  
dbServices.factory('Stats', ['$resource',
  function($resource){
    return $resource('api/stats/:yFrom/:yTo/:type', {}, {
      query: {method:'GET', params:{yFrom:'2014',yTo:'2014',type:'pointsTot'}, isArray:true}
    });
  }]);
  
dbServices.factory('Tournaments', ['$resource',
  function($resource){
    return $resource('api/tournaments', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
