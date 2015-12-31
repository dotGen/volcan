/**** All database related ****/

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
    email : String,
    password : String,
    name : String,
    lastName : String,
    age : Number,
    token : String,
    profilePhoto : String
});

var Complains = mongoose.model('denuncias', complainSchema);
var Users = mongoose.model('usuarios', userSchema);

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

function addUser(obj, callback, errorCallback)
{
  var newUser = new Users(obj);

  newUser.save( function (err, product)
  {
    if (err){
      errorCallback(err);
    }else{
      callback(product);
    }
  });
};
var jfind={"email":"email@cambiado.com"};
var json={"email":"email@cambiado.com"};

function updateUser(find, changes, callback, errorCallback)
{
  Users.findOneAndUpdate(find, changes, {new:true}, function (err, raw) {
    if (err){
      callback(err);
    }else{
      errorCallback(raw);
    }
  });

};

function deleteUser(data, callback, errorCallback)
{Users.findOneAndRemove(data, function (err, found){
      if (err){
        errorCallback(err);
      }else{
        callback(found);
      }
    }
  )
};

deleteUser(jfind, function(found){console.log(found)},function(){console.log("mal")});

function getUserByEmail(email)
{
  Complains.findOne({ 'email': email }, 'email name lastName age', function (err, foundUser) {
  if (err) return handleError(err);
  return foundUser;
  })
};
function getUserByToken(token)
{
  Complains.findOne({ 'token': token }, 'email name lastName age', function (err, foundUser) {
  if (err) return handleError(err);
  return foundUser;
  })
};
