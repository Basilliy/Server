// config/database.js

var mongoUri = process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
              'mongodb://localhost:27017/trello';

module.exports = {
    'url' : mongoUri
};
