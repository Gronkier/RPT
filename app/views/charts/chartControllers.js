'use strict';

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerController', ['$scope', 'playerService',
    function($scope, playerService) {
      
      	$scope.getPlayers =  function() {
            playerService.yearPlayers($scope.year, function(data) { 
                $scope.players = data;
                });
        };

        $scope.getNumber = function(num) {
            if (num > 0)
                return new Array(num);
            return [];
        };
        $scope.getNumberGold = function(num) {
            var gold = Math.floor(num / 10);
            return new Array(gold);
        };
        $scope.getNumberSilver = function(num) {
            var silver = Math.floor((num - Math.floor(num / 10)*10)/5);
            return new Array(silver);
        };
        $scope.getNumberBronze = function(num) {
            var bronze = (num - Math.floor(num / 10)*10 -Math.floor((num - Math.floor(num / 10)*10)/5)*5);
            return new Array(bronze);
        };

    // $scope.setImage = function(imageUrl) {
    //   $scope.mainImageUrl = imageUrl;
    // };

        $scope.year = new Date().getFullYear();
        $scope.getPlayers();
	
}]);

<script>
angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
        $scope.onSeriesHover = function(e) {
            kendoConsole.log(kendo.format("event :: seriesHover ({0} : {1})", e.series.name, e.value));
        };

        $scope.electricity = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "../content/dataviz/js/spain-electricity.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "year",
                dir: "asc"
            }
        });
    })
</script>


[
    {
        "country": "Spain",
        "year": "2008",
        "unit": "GWh",
        "solar": 2578,
        "hydro": 26112,
        "wind": 32203,
        "nuclear": 58973
    },
    {
        "country": "Spain",
        "year": "2007",
        "unit": "GWh",
        "solar": 508,
        "hydro": 30522,
        "wind": 27568,
        "nuclear": 55103
    },
    {
        "country": "Spain",
        "year": "2006",
        "unit": "GWh",
        "solar": 119,
        "hydro": 29831,
        "wind": 23297,
        "nuclear": 60126
    },
    {
        "country": "Spain",
        "year": "2005",
        "unit": "GWh",
        "solar": 41,
        "hydro": 23025,
        "wind": 21176,
        "nuclear": 57539
    }
]