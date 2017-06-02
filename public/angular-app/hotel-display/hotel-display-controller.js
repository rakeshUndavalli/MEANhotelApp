angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($route, $routeParams, hotelDataFactory){
  var vm = this;
  var id = $routeParams.id;
//  console.log("I am invoked",id);
  vm.isSubmitted = false;
  hotelDataFactory.hotelDisplay(id).then(function(response){
    console.log(response.data);
    vm.hotel = response.data;
    vm.stars = _getStarRatings(response.data.stars);
  //  console.log("Type of stars" , typeof response.data.stars === 'string');
  });
  function _getStarRatings(stars){
    return new Array(stars);
  }

  vm.addReview = function(){
    var postData = {
      name : vm.name,
      rating : vm.rating,
      review : vm.review
    };
    if(vm.reviewForm.$valid){
      hotelDataFactory.postReview(id, postData).then(function(response){
        console.log("response status",response.status);
        if(response.status === 201){
          console.log("route reloaded");
          $route.reload();
        }
      }).catch(function(error){
        console.log(error);
      });
    } else{
      vm.isSubitted = true;
    }
  }
};
