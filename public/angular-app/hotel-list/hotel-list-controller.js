angular.module('meanhotel').controller('HotelsController', HotelsController);
function HotelsController(hotelDataFactory){
  var vm = this;
  vm.title = 'Mean Hotel App';
  //console.log("Am  I here?");

  hotelDataFactory.hotelList().then(function(response){
    //console.log(response.data);
    vm.hotels = response.data;

  });
}
