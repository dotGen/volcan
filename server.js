var express = require('express');
var app = express();

app.set("views", __dirname + "/public");
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('Hello World!');
});

var server = app.listen(process.env.PORT | 8080, function () {
  console.log('El puerto es '+ process.env.PORT | 8080);
  console.log('Iniciando servidor en http://%s:%s', server.address().address, server.address().port);
});
