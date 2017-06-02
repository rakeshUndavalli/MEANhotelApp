var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  var point = {
    type:"Point",
    coordinates : [lng, lat]
  };

  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };

  Hotel.geoNear(point, geoOptions, function(err, results, stats){
    console.log("Geo Results", results);
    console.log("Geo stats", stats);
    var response = {
      status : 200,
      message : results
    }
    if(err){
      response.status = 400;
      response.message = {
        "message" : err
      };
    } else if(results.length == 0){
      console.log("Not found");
      response.status = 404;
      response.message = {
        "Message" : "No Hotel found with given coordinates"
      };
    }
    res
      .status(response.status)
      .json(response.message);
  });
}
module.exports.hotelGetAll = function(req, res){

  console.log(req.query);
  var offset = 0;
  var count =  5;
  var maxCount = 10;
  if(req.query&&req.query.lng&&req.query.lat){
    if(isNaN(req.query.lng) || isNaN(req.query.lat)){
      res
        .status(400)
        .json({
          "message" : "Longitude and latitue values must be Numbers"
        });
        return;
    }
    runGeoQuery(req, res);
    return;
  }
  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }
  if(isNaN(offset)||isNaN(count)){
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, offset and count must be numbers"
      });
    return;
  }
  if(count > maxCount){
    res
      .status(400)//bad request
      .json({
        "message" : "count limit of " + maxCount + " exceeded"
      });
      return;
  }

  Hotel
  .find()
  .skip(offset)
  .limit(count)
  .exec(function(err, hotels){
    if(err){
      console.log("Error");
      res
        .status(500)
        .json(err)
    }else{
      console.log("Found Hotels", hotels.length);
      res
        .json(hotels);
    }

  });
  //The below code is written using native mongodb driver
  // collection
  // .find()
  // .skip(offset)
  // .limit(count)
  // .toArray(function(err, docs){
  //   console.log('Found Hotels', docs);
  //   res
  //   .status(200)
  //   .json(docs);
  // });
  //var returnData = hotelData.slice(offset, offset+count);
  //res.json(returnData);
}

module.exports.hotelGetOne = function(req, res){
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  Hotel
    .findById(hotelId)
    .exec( function(err, hotel){
      var response = {
        status : 200,
        message : hotel
      }
      if(err){
        response.status = 500 ;// Internal server error
        response.message = err;
      }else if(!hotel){
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found"
        };
      }
      res
      .status(response.status)
      .json(response.message)
    });
};

  //Native mongodb driver code
  // var db = dbconn.get();
  // var collection = db.collection('hotels');
  // var hotelId = req.params.hotelId;
  // console.log(hotelId);
  // collection
  // .findOne({
  //   _id:ObjectId(hotelId)
  // }, function(err, docs){
  //   res.json(docs);
  // });
  // //var thisHotel = hotelData[hotelId];
  //res.json(thisHotel);

var _splitArray = function(input){
  var output;
  if(input && input.length > 0){
    output = input.split(";");
  }else{
    output = [];
  }
  return output;
};

module.exports.hotelsAddOne = function(req, res){
  Hotel
    .create({
      name:req.body.name,
      description: req.body.description,
      stars:req.body.stars,
      services: _splitArray(req.body.services),
      photos: _splitArray(req.body.photos),
      currency: req.body.currency,
      location:{
        address: req.body.address,
        coordinates: [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)]
      }
    }, function(err, hotel){
      if(err){
        console.log("Error creating hotel")
        res
          .status(400)
          .json(err);
      }else {
        console.log("Hotel Created", hotel);
        res
          .status(201)
          .json(hotel);
      }
    });
}


module.exports.hotelsUpdateOne = function(req, res){
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  Hotel
    .findById(hotelId)
    .select("-reviews -rooms")
    .exec( function(err, doc){
      var response = {
        status : 200,
        message : doc
      }
      if(err){
        response.status = 500 ;// Internal server error
        response.message = err;
      }else if(!doc){
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found"
        };
      }
      if(response.status !== 200){
        res
        .status(response.status)
        .json(response.message)
      } else{
        {
        doc.name=req.body.name;
        doc.description= req.body.description;
        doc.stars=req.body.stars;
        doc.services= _splitArray(req.body.services);
        doc.photos= _splitArray(req.body.photos);
        doc.currency= req.body.currency;
        doc.location={
          address: req.body.address,
          coordinates: [
            parseFloat(req.body.lng),
            parseFloat(req.body.lat)]
      };
    }
  };
    doc.save(function(err, hotelUpdated){
      if(err){
        res
          .status(500)
          .json(err);
      } else{
        res
          .status(204)
          .json();
      }
    });

    });
};

module.exports.hotelsDeleteOne = function(req, res){
  var hotelId = req.params.hotelId;
  Hotel
    .findByIdAndRemove(hotelId)
    .exec(function(err, hotel){
      if(err){
        res
          .status(404)
          .json(err);
      } else {
        console.log("Hotel deleted with ID " + hotelId);
        res
          .status(204)
          .json();
      }
    });
};

// Using native mongoDn driver
// module.exports.hotelAddOne = function(req, res){
//   var db = dbconn.get();
//   var collection = db.collection('hotels');
//   if(req.body&&req.body.name&&req.body.stars){
//     var newHotel = req.body;
//     newHotel.stars = parseInt(req.body.stars);
//     collection.insertOne(newHotel, function(err, response){
//       console.log(response.obs);
//       res
//       .status(201)
//       .json(response.obs);
//     });
//   } else{
//     console.log("Data missing from body");
//   }
//
//
//   res
//   .status(200)
//   .json(req.body);
// }
