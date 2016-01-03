/**** All database related ****/

var mongoose = require('mongoose');

mongoose.connect('mongodb://dotGen:h4g18042015@ds035485.mongolab.com:35485/volcan');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
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

function addComplain(complain, callback, errorCallback) {
  var newComplain = new Complains(complain);

  newComplain.save( function (err, savedProduct)
  {
    if (err){
      errorCallback(err);
    }else{
      callback(savedProduct);
    }
  });
}

function getComplain(data, callback, errorCallback)
{
  Complains.findOne(data, function (err, foundComplain) {
  if (err){
    errorCallback(err);
  }else{
    callback(foundComplain);
  }
  })
}

function deleteComplain(data){
  Complain.findOneAndRemove(data, function (err, deletedComplain){
      if (err){
        errorCallback(err);
      }else{
        callback(deletedComplain);
      }
  }
}

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
}

function updateUser(find, changes, callback, errorCallback)
{
  Users.findOneAndUpdate(find, changes, {new:true}, function (err, raw) {
    if (err){
      callback(err);
    }else{
      errorCallback(raw);
    }
  });

}

function deleteUser(data, callback, errorCallback)
{
  Users.findOneAndRemove(data, function (err, deletedUser){
      if (err){
        errorCallback(err);
      }else{
        callback(deletedUser);
      }
  }
)};

function getUser(data, callback, errorCallback)
{
  Users.findOne(data, function (err, foundUser) {
    if (err) {
      errorCallback(err);
    } else {
      callback(foundUser);
    }
  })
}

module.exports = {
  addUser : addUser,
  updateUser: updateUser,
  deleteUser : deleteUser,
  getUser : getUser

};
