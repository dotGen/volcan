var express = require('express');
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var app = express();

//views directory

app.set("views", __dirname + "/app/views");

//public dependencies

app.use(express.static('app'));

app.use("/scripts/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/scripts/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/scripts/angular-material", express.static(__dirname + "/node_modules/angular-material"));
app.use("/scripts/angular-animate", express.static(__dirname + "/node_modules/angular-animate"));
app.use("/scripts/angular-aria", express.static(__dirname + "/node_modules/angular-aria"));
app.use("/scripts/angular-google-maps", express.static(__dirname + "/node_modules/angular-google-maps/dist"));
app.use("/scripts/lodash", express.static(__dirname + "/node_modules/angular-google-maps/node_modules/lodash"));
app.use("/scripts/angular-simple-logger", express.static(__dirname + "/node_modules/angular-google-maps/node_modules/angular-simple-logger/dist"));
app.use("/scripts/angular-ui-router", express.static(__dirname + "/node_modules/angular-ui-router/release"));

//Middleware AuthenticationService

var checkIfIsAuthorized = function (req, res, next) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.send(403);
    }
};

//Middleware to parse POST request body to JSON (req.body.{parameter})
//--> https://github.com/expressjs/body-parser

app.use(bodyparser.json());

//Middleware to parse url to JSON (req.body.{url-query-parameter})
//--> https://github.com/expressjs/body-parser

app.use(body.parser.urlencoded({extended: true}));

//Routes

  //An user attempt to login

app.get('/signin', function (req, res) {

});

  //An user attempt to register an account

app.post('/signup', function (req, res) {
  //Create token with jwt.
  //Connect to db and save User with unique token.
  //Return token.
});

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/app/template.html');
});

//End routes

var server = app.listen(process.env.PORT | 8081, function () {
  console.log('Initializing server in http://%s:%s', server.address().address, server.address().port);
});
