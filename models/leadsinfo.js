var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongoosePaginate = require('mongoose-paginate');
var _ = require('underscore');

var LeadSchema = mongoose.Schema({
    AD_ID: String,
    BUYER_NAME: String,
    BUYER_EMAIL: String,
    BUYER_PHONE: String,
    BUYER_MESSAGE: String,
    CREATE_DATE: Date
});

LeadSchema.plugin(mongoosePaginate);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

  console.log("we are connected to mongo4");

    /* GET to search result. */
    router.get('/leads', function(req, res, next) {
        var leads = mongoose.model('leadinfo', LeadSchema, 'leads');
        //var page = req.query.page;

        leads.paginate({}, { page: 1, limit: 10, sort: {_id: -1} }).then(function(result) {
            console.log(formatResult(result.docs));
            res.render('leadsinfo', { 
            title: 'Truck Online - Leads Info',
            data: formatResult(result.docs),
            checkinput: true
            });
        });
    });
});

function formatResult(data) {

    results = [];
    for (i = 0; i < data.length; i++) { 
      results[i] =mappingLeadData(data[i]);
    }
    return results;
}
function mappingLeadData(data) {
    var result = {};
    
    var map = {
        _id : "_id",
        AD_ID: "adId",
        BUYER_NAME : "name",
        BUYER_EMAIL: "email",
        BUYER_PHONE: "phone",
        CREATE_DATE: "date",
        BUYER_MESSAGE: "message"   
    };
    _.each(data._doc, function(value, key) {
        key = map[key] || key;
        result[key] = value;
    });
    return result;
}

module.exports = router;