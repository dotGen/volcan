/**** All database related ****/
var mongoose = require('mongoose');

mongoose.connect('mongodb://dotGen:h4g18042015@ds035485.mongolab.com:35485/volcan');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Mongo conectado');
});

var firstSchema = mongoose.Schema({
    name: String
});
var secondSchema = mongoose.Schema({
    address: String,
    gpsPosition: String,
    likes: Number

});

var firstModel = mongoose.model('Prueba', firstSchema);

var firstObject = new firstModel({
  name : 'nombre de prueba'
});

firstSchema.methods.speak = function () {
  var greeting = this.name
    ? "My name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
secondSchema.methods.speak = function () {
  var greeting = this.name
    ? "My name is " + this.name + this.pos
    : "I don't have a name";
  console.log(greeting);
}

var secondModel = mongoose.model('de', secondSchema);
var secondObject = new secondModel({
  name: 'nombre de prueba 2||',
  pos:'25.3,-23.54'
});

secondObject.save(function (err, secondObject) {
  if (err) return console.error(err);
});

secondModel.remove({ name: 'nombre de prueba 2||' }, function (err) {
  if (err) return handleError(err);
  console.log('Se borró');
});
