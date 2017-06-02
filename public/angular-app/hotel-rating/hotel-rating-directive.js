angular.module('meanhotel').directive('hotelRating', hotelRating);
// use as <hotel-rating></hotel-rating>
function hotelRating(){
  return {
    restrict:'E',
    //template:'<span>Hello there</span>'
    template:'<span ng-repeat="star in vm.stars track  by $index" ><small><span class="glyphicon glyphicon-star"></span></small>{{ star }}</span>',
    bindToController: true,
    controller: 'HotelController',
    controllerAs: 'vm',
    scope :{
      stars:'@'
    }
  }
}
