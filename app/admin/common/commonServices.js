'use strict';

var serviceCommon = angular.module('commonServices', []);
var port = '';
var port = '3003';

serviceCommon.factory('commonService', ['$http', '$location', function($http, $location){

  var protocol = $location.protocol().concat('://');
  var host = $location.host();
  //var year = new Date().getFullYear();
  return {

    years: function(callback) {
        var yearFrom = new Date(2014, 1, 1, 0, 0, 0, 0).getFullYear();
        var yearTo = new Date().getFullYear();
        var year = yearFrom;
        var years = [];
        while (year <= yearTo) {
            years.push(year);
            year++;
        }
    callback(years);
    }

  }}]);


