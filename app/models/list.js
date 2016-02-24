// load the things we need
var mongoose   = require('mongoose')
    cardShema  = require('../../app/models/card').schema; // load task shema;

var listSchema = mongoose.Schema({
  title:     String,
  delitable: Boolean,
  cards:     [cardShema]
});

// create the model for list and expose it to our app
module.exports = mongoose.model('List', listSchema);
