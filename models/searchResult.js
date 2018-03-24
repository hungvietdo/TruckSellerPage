var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
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
      var truck = mongoose.model('vehicle', TruckSchema,'vehicle');
      truck.find({ }).limit(2)
      .exec(function(err, searchresults) {
        var str = JSON.stringify(searchresults);
        var result = JSON.parse(str);
        res.render('results', { 
            title: 'Truck Online - Result',
            input: result,
            rawdata: searchresults,
            checkinput: true
          });
      });  
    };
  });
});
module.exports = router;
