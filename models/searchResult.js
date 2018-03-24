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
var Schema = mongoose.Schema;
  /* GET to search result. */
  router.get('/results', function(req, res, next) {
    if (req.query.keyword == "") { 
      console.log("The search input is empty.");
      res.render('results', { 
        title: 'Truck Online - Result',
        input: '',
        checkinput: false,
        rawdata: '',
      });
    } else {
      //query = '{ "MEDIA": { $exists: true, $not: {$size: 0} } }'
      var trucks = mongoose.model('vehicles', TruckSchema, 'vehicles');
      trucks.find({}).limit(20).exec(function(err, searchresults) {
        res.render('results', { 
          title: 'Truck Online - Result',
          data: formatResult(searchresults),
          checkinput: true
        });
      });
    };
  });
});

function formatResult(data) {

  results = [];
  for (i = 0; i < data.length; i++) { 
    results[i] =mappingData(data[i]);
  }
  return results;
  
}
function mappingData(data) {
  var result = {};
  
  var map = {
      _id : "_id",
      AD_ID: "adId",
      MAKE_NAME : "make",
      MODEL_NAME: "model",
      PRICE: "price",
      PHOTO_1: "thumbnail",
      YEAR: "year"
  };

  _.each(data._doc, function(value, key) {
      key = map[key] || key;
      result[key] = value;
      if (key == "thumbnail") {
        result[key] = value.split(",")[1];
      }
  });
  
  return result;
}
module.exports = router;
