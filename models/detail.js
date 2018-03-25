var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var _ = require('underscore');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we are connected to mongo");
var TruckSchema = mongoose.Schema({
    name: String
});

  router.get('/detail', function(req, res, next) {
    if (req.query.id == "") { 
      console.log("The  input is empty.");
      res.render('index', { 
        title: 'Truck Online - Home',
        page: 'Home'
      });
    } else {
      console.log('in detail');
      var detailvehicle = mongoose.model('detailvehicle', TruckSchema, 'vehicles');
      detailvehicle.find({"AD_ID":req.query.id}).exec(function(err, searchresults) {
        var str = JSON.stringify(searchresults);
        var result = JSON.parse(str);
        
        res.render('vehicledetail', { 
          title: 'Truck Online - Result',
          data: mappingData(result[0]),
          checkinput: true
        });


      });
    };
  });
});

function mappingData(data) {
  var result = {};
  var map = {
      _id : "_id",
      AD_ID: "adId",
      MAKE_NAME : "make",
      MODEL_NAME: "model",
      PRICE: "price",
      PHOTO_1: "thumbnail",
      YEAR: "year",
      CITY:"city",
      ZIP_CODE: "zip",
      STATE_CODE: "state",
      STOCK_NUMBER: "stock",
      DEALER_WEBSITE_URL: "website",
      DEALER_DESCRIPTION: "dealerDescription",
      COMPANY_NAME: "company",
      DISPLAY_MILEAGE: "mileage",
      SHORT_TEXT_5: "fuelType",
      SHORT_TEXT_1: "brakeType",
      CATEGORY_NAME: "category",
      DESCRIPTION: "description",
      ENGINE_SIZE: "engineSize"
  };

  _.each(data, function(value, key) {
      key = map[key] || key;
      result[key] = value;
      if (key == "thumbnail") {
        result[key] = value.split(",")[1];
      }
  });

  if (parseInt(data['PHOTO_COUNT'])>0) {
    photos = [];
    media = data['MEDIA']
    for (i = 0; i < media.length; i++) { 
      photos[i] = media[i].split("||")[1]+".jpg";
    }
    result['photos'] = photos;
  }
  
  return result;
}
module.exports = router;
