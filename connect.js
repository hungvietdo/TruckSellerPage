var assert = require('assert')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

console.log('\n===========');
console.log('    mongoose version: %s', mongoose.version);
console.log('========\n\n');

var dbname = 'test';
console.log('dbname: %s', dbname);
mongoose.connect('http://ec2-54-201-34-143.us-west-2.compute.amazonaws.com', dbname);
mongoose.connection.on('error', function () {
  console.error('connection error', arguments);
});

var user = new Schema({
    name: String
  , friends: [{ type: Schema.ObjectId, ref: 'User' }]
});
var User = mongoose.model('User', user);

var blogpost = Schema({
    title: String
  , tags: [String]
  , author: { type: Schema.ObjectId, ref: 'User' }
})
var BlogPost = mongoose.model('BlogPost', blogpost);

mongoose.connection.on('open', function () {
  

 
      BlogPost.find({ tags: 'fun' }).lean().populate('author').exec(function (err, docs) {
          
           console.log(docs);
        })
   
});
