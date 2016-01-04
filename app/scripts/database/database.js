/**** All database related ****/

var mongoose = require('mongoose');

mongoose.connect('mongodb://dotGen:h4g18042015@ds035485.mongolab.com:35485/volcan');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conexión establecida con Mongo.");
});

var complaintSchema = mongoose.Schema
({
    latitude : Number,
    longitude : Number,
    address: String,
    likes : Number,
    description: String,
    moderated : Boolean,
    date : String,
    comments : Array,
    photo : String,
    audio : String
});

complaintSchema.index({latitude:1, longitude:1},{unique:true});

var userSchema = mongoose.Schema
({
    email : String,
    password : String,
    name : String,
    lastName : String,
    age : Number,
    profilePhoto : String
});

var Complaints = mongoose.model('denuncias', complaintSchema);
var Users = mongoose.model('usuarios', userSchema);

function addComplaint(complaint, callback, errorCallback) {
  var newComplaint = new Complaints(complaint);
  newComplaint.save( function (err, savedProduct)
  {
    if (err){
      errorCallback(err);
    }else{
      callback(savedProduct);
    }
  });
}

function getComplaint(data, callback, errorCallback)
{
  Complaints.findOne(data, function (err, foundComplaint) {
  if (err){
    errorCallback(err);
  }else{
    callback(foundComplaint);
  }
})
}

function getAllComplaints (callback, errorCallback)
{
  Complaints.find(function(err, foundComplaints){
    if(err){
      errorCallback(err);
    }else{
      callback(foundComplaints);
    }
  })
}

function deleteComplaint(data, callback, errorCallback)
{
  Complaint.findOneAndRemove(data, function (err, deletedComplaint){
      if (err){
        errorCallback(err);
      }else{
        callback(deletedComplaint);
      }
  })
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
  });
}

function getUser(data, callback, errorCallback)
{
  Users.findOne(data, function (err, foundUser) {
    if (err) {
      errorCallback(err);
    } else {
      callback(foundUser);
    }
  });
}


module.exports = {
  addUser : addUser,
  updateUser: updateUser,
  deleteUser : deleteUser,
  getUser : getUser,
  getAllComplaints: getAllComplaints,
  addComplaint : addComplaint,
  deleteComplaint : deleteComplaint,
  getComplaint : getComplaint
};
