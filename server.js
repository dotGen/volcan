var express = require('express');
var app = express();

app.set("views", __dirname + "/public");

app.use(express.static('public'));
app.use("/scripts/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/scripts/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/scripts/angular-material", express.static(__dirname + "/node_modules/angular-material"));

app.get('/', function (req, res) {
  res.sendFile('index');
});

var server = app.listen(process.env.PORT | 8080, function () {
  console.log('Initializing server in http://%s:%s', server.address().address, server.address().port);
});
