var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
  console.log("Mongoose connected to ", dburl);
});
mongoose.connection.on('disconnected',function(){
  console.log("Mongoose disconnected ");
});
mongoose.connection.on('error',function(err){
  console.log("Mongoose connection error", err);
});
//Unix based systems(Ctrl + C)
process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});
//Heroku
process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});
//user restart unix based systems
process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});

//Require Mongoose  Data Model
require('./hotels.model');
require('./users.model');
