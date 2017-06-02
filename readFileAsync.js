var fs = require('fs');

console.log("going to get the file");

fs.readFile('readFileAsync.js', function(err, file){
  console.log("from inside of the callback " + file);
});
console.log("file fetched");

//console.log("end of getting file from outside of the callback "+ file1);
