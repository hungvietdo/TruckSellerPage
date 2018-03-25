var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongoosePaginate = require('mongoose-paginate');
var LeadSchema = mongoose.Schema({
    AD_ID: String,
    BUYER_NAME: String,
    BUYER_EMAIL: String,
    BUYER_PHONE: String,
    BUYER_MESSAGE: String,
    CREATE_DATE: Date
});
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

  console.log("we are connected to mongo4");

    /* GET to search result. */
    router.get('/sendlead', function(req, res, next) {
        console.log(req.query);


        var Lead = mongoose.model('SendLead', LeadSchema, 'leads');       
        var createDate = new Date();
        var newlead = new Lead(
            {   AD_ID: req.query.adId,
                BUYER_NAME: req.query.buyerName,
                BUYER_EMAIL: req.query.buyerEmail,
                BUYER_PHONE: req.query.buyerPhone,
                BUYER_MESSAGE: req.query.buyerMessage,
                CREATE_DATE: createDate
            }
        ); 

        // // Create an instance of model SomeModel
        // var awesome_instance = new SomeModel({ name: 'awesome' });

        // // Save the new model instance, passing a callback
        // awesome_instance.save(function (err) {
        // if (err) return handleError(err);
        // // saved!
        // });

        db.collection("leads").insertOne(newlead, function(err, res) {
            if (err) throw err;
            console.log("Document inserted");
            // close the connection to db when you are done with it
            //db.close();
        });
        res.json( {"result": "Inserted successfully."});
    });
});
module.exports = router;