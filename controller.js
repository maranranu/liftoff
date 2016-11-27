var http = require('http');
var request = require('request');
var _ = require('underscore');
var weathercontroller = {};

weathercontroller.weatherMap = function(req, res) {
  request('http://api.openweathermap.org/data/2.5/forecast/city?id=1259229&APPID=a873764477c76454f42238c5ebf87e2e', function(error, response, body) {
      if (!error && response.statusCode == 200) {
          json = JSON.parse(body)
          obj = json.list
          var dt = new Date();
          sortdata = _.sortBy(json.list, function(num) {
              return num.main.temp;
          });
          var tempsort = []
          for (var i in sortdata) {
            if (sortdata[i].dt_txt.split(" ")[0] == dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()) {
              tempsort.push({
                  "date": sortdata[i].dt_txt,
                  "temp": sortdata[i].main.temp,
                  "timestamp": sortdata[i].dt,
                  "time": sortdata[i].dt_txt.split(" ")[1]
              })
            }
          }
      }
      var result = {
        "day": dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate(),
        "min_temp": _.min(json.list, function(o) {
            if(o.dt_txt.split(" ")[0] == dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()) {
            return o.main.temp;
          }
        }).main.temp,
        "max_temp": _.max(json.list, function(o) {
            if(o.dt_txt.split(" ")[0] == dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()) {
            return o.main.temp;
          }
        }).main.temp,
        "list": tempsort
      }
      return res.send(result)
  })
}

module.exports = weathercontroller;
