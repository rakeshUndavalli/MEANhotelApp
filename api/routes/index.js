var express = require('express');
var router = express.Router();
// var path = require('path');
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
router
  .route('/hotels')
  .get(ctrlHotels.hotelGetAll)
  .post(ctrlHotels.hotelsAddOne);
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);

// Hotel reviews routes

router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);
router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);
// router
//       .route('/hotels/:hotelId/new')
//       .post(ctrlHotels.hotelAddOne);
// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);
router
  .route('/users/login')
  .post(ctrlUsers.login);
module.exports = router;
