var name = function(name){
  console.log("Hi my name is " + name);
}

var intro = function(){
  console.log("Hi this is intro function");
}

module.exports = {
  name: name,
  intro: intro
}
