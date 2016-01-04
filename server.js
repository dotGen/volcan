var express = require('express');
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var database = require('./app/scripts/database/database.js');

//config

var config = require('./config/config.js');

var app = express();

//Directorio de vistas

app.set("views", __dirname + "/app/views");

//Dependencias publicas

app.use(express.static('app'));

app.use("/scripts/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/scripts/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/scripts/angular-material", express.static(__dirname + "/node_modules/angular-material"));
app.use("/scripts/ngstorage", express.static(__dirname + "/node_modules/ngstorage"));
app.use("/scripts/angular-messages", express.static(__dirname + "/node_modules/angular-messages"));
app.use("/scripts/angular-animate", express.static(__dirname + "/node_modules/angular-animate"));
app.use("/scripts/angular-aria", express.static(__dirname + "/node_modules/angular-aria"));
app.use("/scripts/angular-google-maps", express.static(__dirname + "/node_modules/angular-google-maps/dist"));
app.use("/scripts/lodash", express.static(__dirname + "/node_modules/angular-google-maps/node_modules/lodash"));
app.use("/scripts/angular-simple-logger", express.static(__dirname + "/node_modules/angular-google-maps/node_modules/angular-simple-logger/dist"));
app.use("/scripts/angular-ui-router", express.static(__dirname + "/node_modules/angular-ui-router/release"));

//Middleware para comprobar si el token es auténtico.

var checkIfIsAuthorized = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret_jwt_key, function(err, decoded){
          if(err) res.send({error:true, message:'Token no valido o no existe'});
          req.decoded = decoded;
          next();
        });
    } else {
      res.send(403);
    }
};

//Middleware to parse POST request body to JSON (req.body.{parameter})
//--> https://github.com/expressjs/body-parser

app.use(bodyparser.json());

//Middleware to parse url to JSON (req.body.{url-query-parameter})
//--> https://github.com/expressjs/body-parser

app.use(bodyparser.urlencoded({extended: true}));

//Middleware for set HTTP Headers for authentication.

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Rutas

  //Devuelve las denuncias

app.get('/denuncias', function (req, res) {
  database.getAllComplains(
    function (complaints) {
    res.json(complaints);
  } , function (err) {
    res.json({
      error : 'Ha ocurrido un error al enviar las denuncias '
    });
  });
});

  //El usuario intenta loguearse.

app.post('/entrar', function (req, res) {
  database.getUser({'email' : req.body.email}
  , function (user) {
    if (req.body.password != user.password) {
      res.json({
        error : 'Usuario y/o Contraseña incorrecto : '
      });
    } else {
        res.json({
          token: jwt.sign({ email : user.email, name: user.name},  config.secret_jwt_key, {expiresIn : '2h'})
        });
    }
  }, function (err) {
    res.json({
      error : err
    });
  });

});

  //Un usuario intenta registrarse.

app.post('/registro', function (req, res) {
  database.addUser({email : req.body.email, password : req.body.password.toString(), name: req.body.name}
  , function (user) {
    res.json({
      token: user.token
    });
  }, function (err) {
    res.json({
      error : err
    });
  });
});

  //Enviamos la plantilla.

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/app/plantilla.html');
});

//Fin rutas

var server = app.listen(process.env.PORT | 8081, function () {
  console.log('Initializing server in http://%s:%s', server.address().address, server.address().port);
});
