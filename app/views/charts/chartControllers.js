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
                $scope.charts = ['pos','pointsTot','winTot'];
                $scope.chartSelected = $scope.charts[0];
        };

      	$scope.getChart =  function() {
            chartService.yearCharts($scope.yearSelected, function(data) {
                var labels=[];
                var series =[];
                var chartData =[];
                var i=0;
                var j=0;
                for (i = 0; i < data.length; i++)
                {
                    labels.push(data[i][0].date.toString().substring(0,10));
                    var dataRow = [];
                    for (j = 0; j < data[i].length; j++)
                    {
                        if(i==0){
                            series.push(data[i][j]._id);
                        }
                        if($scope.chartSelected == 'pos')
                            dataRow.push(data[i][j].pos);
                        if($scope.chartSelected == 'pointsTot')
                            dataRow.push(data[i][j].pointsTot);
                        if($scope.chartSelected == 'winTot')
                            dataRow.push(data[i][j].winTot);
                    }
                    chartData.push(dataRow);
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