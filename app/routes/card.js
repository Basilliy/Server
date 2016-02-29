var User    = require("../../app/models/user"); // load up the user model


/**
 * get all cards request
 */
exports.getCards = function(req, res) {
  var listId    = req.params.list;
  var queryUser = { name: req.params.user };

  User
    .findOne(queryUser)
    .select("lists._id lists.cards")
    .exec(function (err, user) {
      if (err) throw err;

      var cards = user.lists.id(listId).cards;
      res.json({ cards: cards });
  });
};

/**
 * save card request
 */
exports.addCard = function(req, res) {

  var queryUser = { name: req.params.user };
  var listId    = req.params.list;
  var cardText  = req.body.text;

  User
    .findOne(queryUser)
    .exec(function (err, user) {
      if (err) throw err;

      var list = user.lists.id(listId);

      list.cards.push({
        text: cardText,
      });

      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ cards: list.cards });
      });
    });
};

/**
 * remove one card request
 */
exports.removeCard = function(req, res) {
  var listId    = req.params.list;
  var cardId    = req.params.card;
  var queryUser = { name: req.params.user };

  User
    .findOne(queryUser)
    .select("lists._id lists.cards")
    .exec(function (err, user) {
      if (err) throw err;

      user.lists.id(listId).cards.id(cardId).remove();
      user.save(function (err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
};

// /**
//  * put changes in card
//  */
// exports.updatecard = function(req, res, next) {
//   var listId    = req.params.id_list;
//   var cardId    = req.params.id_card;
//   var queryUser = { _id: req.user._id };

//   User
//     .findOne(queryUser)
//     .select("lists._id lists.cards")
//     .exec(function (err, user) {
//       if (err) throw err;

//       var card = user.lists.id(listId).cards.id(cardId);

//       if (req.body.completed) {
//         card.completed = (card.completed)
//           ? false
//           : true;
//       } else if (req.body.color) {
//         card.color = req.body.color;
//       } else if (req.body.text) {
//         card.text = req.body.text;
//       }


//       user.save(function (err, done) {
//         if (err) return done(err);

//         res.json({ card: card });
//       });
//   });
// };
