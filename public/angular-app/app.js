angular.module('meanhotel', ['ngRoute'])
       .config(config);
function config($routeProvider){
  $routeProvider
  .when('/', {
      templateUrl : 'angular-app/hotel-list/hotels.html',
      controller: HotelsController,
      controllerAs: 'vm'
    })
    .when('/hotel/:id',{
      //template : "<h1>None</h1><p>Nothing has been selected</p>",
      templateUrl:'angular-app/hotel-display/hotel.html',
      controller:HotelController,
      controllerAs:'vm'
    })
    .otherwise({
      template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
};
