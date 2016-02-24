// load the things we need
var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  text:         String,
  owners:       String,
  color:        { type: String, default: 'cards__color--red' }
});

// create the model for todo and expose it to our app
module.exports = mongoose.model('card', cardSchema);
