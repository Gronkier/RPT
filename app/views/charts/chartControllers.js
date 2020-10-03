'use strict';

var chartControllers = angular.module('chartControllers', ['chart.js']);
Chart.defaults.global.colors = ['#00E676', '#EF6C00', '#03A9F4', '#FFEA00', '#E91E63', '#009688', '#E53935', '#7B1FA2'];

chartControllers.controller('chartController', ['$scope', 'chartService','commonService',
    function($scope, chartService, commonService) {

        $scope.getYears =  function() {
            commonService.years(function(data) {
                $scope.years = data;
                $scope.yearSelected = $scope.years[$scope.years.length-1];
            });
        };

        $scope.getCharts =  function() {
                $scope.charts = ['Punti','Classifica','Vittorie'];
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
                    for (i = 0; i < data[data.length-1].length; i++) {
                        if(i>7)
                            break;
                        series.push(data[data.length-1][i]._id);
                        dataRow = new Array(data.length-1);
                        chartData.push(dataRow)
                    }
                    //get data
                    for (i = 0; i < data.length; i++) {
                        // x axis
                        labels.push(data[i][0].date.toString().substring(0, 10));
                        //series
                        for(k=0; k<series.length; k++) {
                            //init
                            if ($scope.chartSelected == 'Classifica')
                                chartData[k][i]=-data[data.length-1].length;
                            if ($scope.chartSelected == 'Punti')
                                chartData[k][i]= 0;
                            if ($scope.chartSelected == 'Vittorie')
                                chartData[k][i]= 0;

                            //search values
                            for (j = 0; j < data[i].length; j++) {
                                if (series[k] == data[i][j]._id) {
                                    if ($scope.chartSelected == 'Classifica')
                                        chartData[k][i]= -data[i][j].pos;
                                    if ($scope.chartSelected == 'Punti')
                                        chartData[k][i]= data[i][j].pointsTot;
                                    if ($scope.chartSelected == 'Vittorie')
                                        chartData[k][i]= data[i][j].winTot;
                                    break;
                                }
                            }
                        }
                    }
                }

                $scope.labels = labels;
                $scope.series = series;
                $scope.data = chartData;
                $scope.options = {legend: {display: true}, elements: {line :{tension : 0.1, fill:false}}};

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