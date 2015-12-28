
var mongoose = require('mongoose');

mongoose.connect('mongodb://dotGen:h4g18042015@ds035485.mongolab.com:35485/volcan');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Mongo conectado');
});

var complainSchema = mongoose.Schema
({
    gpsPosition: String,
    address: String,
    likes : Number,
    description: String,
    moderated : Boolean,
    date : String,
    comments : Array,
    photo : String,
    audio : String
});

var userSchema = mongoose.Schema
({
    userName : String,
    password : String,
    name : String,
    lastName : String,
    age : Number,
    email : String,
    profilePhoto : String
});

var Complains = mongoose.model('denuncias', complainSchema);

function addComplain(gpsPosition, address, description, photo, audio)
{
  var newComplain = new Complains
  ({
    gpsPosition : gpsPosition,
    address : address,
    description : description,
    photo : photo,
    audio : audio
  });

  newComplain.save( function (err)
  {
    if (err) return console.error(err);
  });
};

function getComplain(gpsPosition)
{
  Complains.findOne({ 'gpsPosition': gpsPosition }, 'address likes', function (err, foundComplain) {
  if (err) return handleError(err);
  return foundComplain;
  })
};

function deleteComplain(gpsPosition){
  Complains.remove
  (
    {'gpsPosition': gpsPosition }, function (err){
      if (err) return handleError(err);
    }
  )
};
