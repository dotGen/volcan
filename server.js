var express = require('express');
var jwt = require('jsonwebtoken');
var database = require('./app/scripts/database/database.js');

//formidable

var formidable = require('formidable');

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
app.use("/scripts/angularjs-geolocation", express.static(__dirname + "/node_modules/angularjs-geolocation/dist"));
app.use("/scripts/ng-file-upload", express.static(__dirname + "/node_modules/ng-file-upload/dist"));

//Middleware for set HTTP Headers for authentication.

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Filename generator

function filenameGenerator(filename) {
  return new Date().getTime() + "." + filename.split('.')[1];
}

//Middleware para comprobar si el token es auténtico.

var checkIfIsAuthorized = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret_jwt_key, function(err, decoded){
          if(err) {
            console.log("TOKEN INCORRECTO");
            res.send({error:true, message:'Token no valido o no existe'});
          } else {
            console.log("TOKEN CORRECTO");
            req.decoded = decoded;
            next();
          }
      });
    } else {
      res.send(403);
    }
};

//Middleware de parseo de archivos y campos.

var parser = function (req, res, next) {
    var form = new formidable.IncomingForm();

    req.body = {};

    form.parse(req);

    form.on("fileBegin", function (name, file) {
        var path_to_file = "/uploads/" +((name=='audio')?'audio':'images')+"/"+ filenameGenerator(file.name);
        file.path = __dirname + "/app" + path_to_file;
        req.body[name] = path_to_file;
    });

    form.on("field", function (name, value){
        req.body[name]= value;
    });

    form.on('error', function(err) {
      console.log(err);
    });

    form.on('aborted', function() {
      console.log("Upload aborted by the user!");
    });

    form.on('end', function () {
      next();
    });
};

//Rutas

app.post('/denuncias/denunciar', checkIfIsAuthorized, parser, function (req, res) {

    console.log(req.body);
    database.addComplaint({description : req.body.description, latitude: req.body.latitude, longitude: req.body.longitude, photo: req.body.photo, audio: req.body.audio}
    , function (complaint) {
        res.json(complaint);
    }, function (error) {
        res.json(error);
    });

});

  //Devuelve la denuncia en una posicion

app.get('/denuncias/:position', function (req, res) {
    database.getComplaint({longitude : req.params.position.split(',')[0], latitude : req.params.position.split(',')[1]},
      function (complaint) {
        res.json(complaint);
    } , function (err) {
        res.json({
          error : 'Ha ocurrido un error al enviar las denuncias '
        });
    });
});

  //Devuelve todas las denuncias

app.get('/denuncias', function (req, res) {
    database.getAllComplaints(
      function (complaints) {
      res.json(complaints);
    } , function (err) {
      res.json({
        error : 'Ha ocurrido un error al enviar las denuncias '
      });
    });
});

  //El usuario intenta loguearse.

app.post('/entrar', parser, function (req, res) {

    database.getUser({'email' : req.body.email}
    , function (user) {
      if (req.body.password != user.password) {
        res.json({
          error : 'Usuario y/o Contraseña incorrecto : '
        });
      } else {
          res.json({
            token: jwt.sign({ email : user.email, name: user.name},  config.secret_jwt_key)
          });
      }
    }, function (err) {
      res.json({
        error : err
      });
    });

});

  //Un usuario intenta registrarse.

app.post('/registro', parser, function (req, res) {

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
  res.sendFile(__dirname + '/app/index.html');
});

//Fin rutas

var server = app.listen(process.env.PORT | 8081, function () {
  console.log('Initializing server in http://%s:%s', server.address().address, server.address().port);
});
