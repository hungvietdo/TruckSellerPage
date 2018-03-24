var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongoosePaginate = require('mongoose-paginate');

db.on('error', console.error.bind(console, 'connection error:'));
var TruckSchema = mongoose.Schema({
    name: String
});
TruckSchema.plugin(mongoosePaginate);


db.once('open', function() {

  console.log("we are connected to mongo1");

    /* GET to search result. */
    router.get('/bears', function(req, res, next) {
    if (req.query.keyword == "")
        { 
            console.log("The search input is empty.");
        } else {
            var trucks = mongoose.model('vehicles', TruckSchema);
            
            // trucks.paginate(, { page: 3, limit: 1 }, 
            //     function(err, result) {
            //         res.json( {"test": result});
            //   });   

              trucks.paginate({"MEDIA": { $gt: [] }}, { page: 1, limit: 10 }).then(function(result) {
                res.json( {"test": result.docs});
              });

            // trucks.find({"MEDIA": { $gt: [] }}).limit(2)
            // .exec(function(err, searchresults) {
            //     var str = JSON.stringify(searchresults);
            //     var result = JSON.parse(str);
            //     res.json(result);
            // });  
        };
    });
});
module.exports = router;