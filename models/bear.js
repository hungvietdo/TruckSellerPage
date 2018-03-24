var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var TruckSchema = mongoose.Schema({
    name: String
});


db.once('open', function() {

  console.log("we are connected to mongo1");

    /* GET to search result. */
    router.get('/bears', function(req, res, next) {
    if (req.query.keyword == "")
        { 
            console.log("The search input is empty.");
        } else {
        var truck = mongoose.model('vehicle', TruckSchema,'vehicle');
        truck.find({ }).limit(1)
        .exec(function(err, searchresults) {
            var str = JSON.stringify(searchresults);
            var result = JSON.parse(str);
            res.json(result);

        });  
        };
    });
});
module.exports = router;