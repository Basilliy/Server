// load the things we need
var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  text:         String,
  color:        String
});

// create the model for todo and expose it to our app
module.exports = mongoose.model('card', cardSchema);
