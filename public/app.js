'use strict';

angular.module("weathermapApp", [
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "temp.html",
        controller: "WeatherMapController",
        resolve: {
          temperature: function(Temperature) {
              return Temperature.getTemperature();
          }
        }
      })
  })
  .service("Temperature", function($http) {
    this.getTemperature = function() {
      return $http.get("/weather").
        then(function(response) {
          console.log(response);
            return response;
        }, function(response) {
            alert("Error retrieving contacts.");
        });
    }
  })
  .controller("WeatherMapController", function(temperature, $scope) {
    $scope.temperature = temperature.data;
    var columnData = ['Temperature'],rowData=[]
    for (var temp in $scope.temperature.list) {
      columnData.push($scope.temperature.list[temp].temp)
      rowData.push($scope.temperature.list[temp].time)
    }
    c3.generate({
    data: {
        columns: [
            columnData
        ],
        type: "spline",
        colors: {
          'Temperature': '#ff0000'
        }
    },
    size:{
          height:400
        },
        padding: {
             left: 70,
             right: 60,
             top: 40
           },
    axis: {
        x: {
          type: "category",
          categories: rowData,
          padding: {
                  left: 0.1,
                  right: 0
                },
          label: {"text":"Date-time","position":"outer"}
        }, y: {
          padding: {
                  top: 1,
                  bottom: 2
                },
          label: {"text":"Temperature","position":"outer-middle"}
        }
    }
});
  })
  .controller('chartController', function(temperature, $scope) {
    $scope.temperature = temperature.data;

  })
