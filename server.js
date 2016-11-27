var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var controller = require('./controller');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/weather', controller.weatherMap);

app.listen(3000, function () {
  console.log('weather map app listening on port 3000')
})
