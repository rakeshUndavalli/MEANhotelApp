var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username : {
    type : String,
    unique : true,
    required: true
  },
  name : {
    type : String
  },
  password : {
    type : String,
    required : true
  }
});

mongoose.model('User', userSchema );
