var express = require('express');
var app = express();

//views directory

app.set("views", __dirname + "/public");

//public dependencies

app.use(express.static('public'));
app.use("/scripts/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/scripts/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/scripts/angular-material", express.static(__dirname + "/node_modules/angular-material"));
app.use("/scripts/angular-google-maps", express.static(__dirname + "/node_modules/angular-google-maps/dist"));
app.use("/scripts/lodash", express.static(__dirname + "/node_modules/angular-google-maps/node_modules/lodash"));
app.use("/scripts/angular-simple-logger", express.static(__dirname + "/node_modules/angular-google-maps/node_modules/angular-simple-logger/dist"));

app.get('/', function (req, res) {
  res.sendFile('index');
});

var server = app.listen(process.env.PORT | 8080, function () {
  console.log('Initializing server in http://%s:%s', server.address().address, server.address().port);
});
