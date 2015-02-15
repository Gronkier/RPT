'use strict';

var chartControllers = angular.module('chartControllers', ['chart.js']);

chartControllers.controller('chartController', ['$scope', 'chartService','commonService',
    function($scope, chartService, commonService) {

        $scope.getYears =  function() {
            commonService.years(function(data) {
                $scope.years = data;
                $scope.yearSelected = $scope.years[$scope.years.length-1];
            });
        };

        $scope.getCharts =  function() {
                $scope.charts = ['Classifica','Punti','Vittorie'];
                $scope.chartSelected = $scope.charts[0];
        };

      	$scope.getChart =  function() {
            chartService.yearCharts($scope.yearSelected, function(data) {
                var labels=[];
                var series =[];
                var chartData =[];
                var i=0;
                var j=0;
                var k=0;
                if(data.length >0) {
                    //get players
                    var dataRow;
                    for (i = 0; i < data[0].length; i++) {
                        if(i>6)
                            break;
                        series.push(data[0][i]._id);
                        dataRow = new Array(data.length-1);
                        chartData.push(dataRow)
                    }
                    //get data
                    var reverseIndex = data.length-1;
                    for (i = reverseIndex; i >= 0; i--) {
                        // x axis
                        labels.push(data[i][0].date.toString().substring(0, 10));
                        //series
                        for(k=0; k<series.length; k++) {
                            //init
                            if ($scope.chartSelected == 'Classifica')
                                chartData[k][reverseIndex-i]=-data[0].length;
                            if ($scope.chartSelected == 'Punti')
                                chartData[k][reverseIndex-i]= 0;
                            if ($scope.chartSelected == 'Vittorie')
                                chartData[k][reverseIndex-i]= 0;

                            //search values
                            for (j = 0; j < data[i].length; j++) {
                                if (series[k] == data[i][j]._id) {
                                    if ($scope.chartSelected == 'Classifica')
                                        chartData[k][reverseIndex-i]= -data[i][j].pos;
                                    if ($scope.chartSelected == 'Punti')
                                        chartData[k][reverseIndex-i]= data[i][j].pointsTot;
                                    if ($scope.chartSelected == 'Vittorie')
                                        chartData[k][reverseIndex-i]= data[i][j].winTot;
                                    break;
                                }
                            }
                        }
                    }
                }

                $scope.labels = labels;
                $scope.series = series;
                $scope.data = chartData;

            });
        };

        //Init
        $scope.getYears();
        $scope.getCharts();

        $scope.getChart();

        //Events
        $scope.onYearChange = function(year) {
            $scope.yearSelected = year;
            $scope.getChart();
        };

        $scope.onChartChange = function(chart) {
            $scope.chartSelected = chart;
            $scope.getChart();
        };

}]);