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
//===================== express website =================================

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { 
      title: 'Truck Online - Home',
      page: 'Home'
        });
  });
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
      truck.find({ }).limit(1)
      .exec(function(err, searchresults) {
        var str = JSON.stringify(searchresults);
        var restored = JSON.parse(str);
    
        res.render('results', { 
            title: 'Truck Online - Result',
            input: restored,
            rawdata: searchresults,
            checkinput: true

          });
      });  
    };
  });

//populate data

// var user = new Schema({
// username: String
// , _id: { type: Schema.ObjectId, ref: 'User' }

// });
// var User = mongoose.model('User', user,'seller');

// var blogpost = Schema({
// Category: String

// , sellerid: { type: Schema.ObjectId, ref: 'User' }
// });

// var BlogPost = mongoose.model('BlogPost', blogpost,'vehicle');

//   /* GET to result detail. */
//   router.get('/results/:truckid/:images', function(req, res, next) {


//       var str = JSON.stringify(req.params.images);
//       var restored = req.params.images;
        
      
//       //Search by vehicle ID
      
//       BlogPost.find({ "_id": req.params.truckid }).lean().populate('sellerid').exec(function (err, docs) {

//       console.log(docs);
//         res.render('vehicledetail', { 
//               title: 'Truck Online - Vehicle Detail',
//               page: 'resultsdetail',
//               truckid: req.params.truckid,
//               data:docs,
//               images:restored
//                 });
            

//       });



        

//   });

//   router.get('*', function(req, res, next) {
//     res.render('error', { title: 'Truck Online - Error' });
//   });

//===================== express website =================================




});

//=====================




module.exports = router;
