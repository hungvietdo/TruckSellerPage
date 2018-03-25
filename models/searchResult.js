var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var _ = require('underscore');
var mongoosePaginate = require('mongoose-paginate');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we are connected to mongo");
var VehicleSchema = mongoose.Schema({
    name: String
});
VehicleSchema.plugin(mongoosePaginate);

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
      var trucks = mongoose.model('searchresult', VehicleSchema, 'vehicles');
      var page = req.query.page;

      trucks.paginate({"MEDIA": { $gt: [] }, $text: {$search: req.query.keyword}}, { page: page, limit: 10 }).then(function(result) {
        res.render('results', { 
          title: 'Truck Online - Result',
          searchdata: formatResult(result.docs),
          checkinput: true
        });
      });
    };
  });
});

function formatResult(data) {

  results = [];
  for (i = 0; i < data.length; i++) { 
    results[i] =mappingSearchData(data[i]);
  }
  return results;
  
}
function mappingSearchData(data) {
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
