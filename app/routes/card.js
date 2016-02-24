var User    = require("../../app/models/user"); // load up the user model

/**
 * save card request
 */
<<<<<<< HEAD
exports.addcard = function(req, res) {
  var listId    = req.params.id;
  var cardText  = req.body.text;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.cards")
=======
exports.addCard = function(req, res) {

  var queryUser = { name: req.params.user };
  var listId    = req.params.list;
  var cardText  = req.body.text;

  User
    .findOne(queryUser)
>>>>>>> 1d27a25dbc414c5b7dc3e0b3955226d63041dfc5
    .exec(function (err, user) {
      if (err) throw err;

      var list = user.lists.id(listId);

      list.cards.push({
        text: cardText,
      });

<<<<<<< HEAD
=======
      console.log(list.cards)

>>>>>>> 1d27a25dbc414c5b7dc3e0b3955226d63041dfc5
      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ cards: list.cards });
      });
    });
};

<<<<<<< HEAD
/**
 * get one card request
 */
exports.getcard = function(req, res) {
  var listId    = req.params.id_list;
  var cardId    = req.params.id_card;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.cards")
    .exec(function (err, user) {
      if (err) throw err;

      var card = user.lists.id(listId).cards.id(cardId);
      res.json({ card: card });
  });
};

/**
 * get all cards request
 */
exports.getcards = function(req, res) {
  var listId    = req.params.id_list;
  var queryUser = { _id: req.user._id };

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
 * remove one card request
 */
exports.removecard = function(req, res) {
  var listId    = req.params.id_list;
  var cardId    = req.params.id_card;
  var queryUser = { _id: req.user._id };

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

/**
 * put changes in card
 */
exports.updatecard = function(req, res, next) {
  var listId    = req.params.id_list;
  var cardId    = req.params.id_card;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.cards")
    .exec(function (err, user) {
      if (err) throw err;

      var card = user.lists.id(listId).cards.id(cardId);

      if (req.body.completed) {
        card.completed = (card.completed)
          ? false
          : true;
      } else if (req.body.color) {
        card.color = req.body.color;
      } else if (req.body.text) {
        card.text = req.body.text;
      }


      user.save(function (err, done) {
        if (err) return done(err);

        res.json({ card: card });
      });
  });
};
=======
// /**
//  * get one card request
//  */
// exports.getcard = function(req, res) {
//   var listId    = req.params.id_list;
//   var cardId    = req.params.id_card;
//   var queryUser = { _id: req.user._id };

//   User
//     .findOne(queryUser)
//     .select("lists._id lists.cards")
//     .exec(function (err, user) {
//       if (err) throw err;

//       var card = user.lists.id(listId).cards.id(cardId);
//       res.json({ card: card });
//   });
// };

// /**
//  * get all cards request
//  */
// exports.getcards = function(req, res) {
//   var listId    = req.params.id_list;
//   var queryUser = { _id: req.user._id };

//   User
//     .findOne(queryUser)
//     .select("lists._id lists.cards")
//     .exec(function (err, user) {
//       if (err) throw err;

//       var cards = user.lists.id(listId).cards;
//       res.json({ cards: cards });
//   });
// };

// /**
//  * remove one card request
//  */
// exports.removecard = function(req, res) {
//   var listId    = req.params.id_list;
//   var cardId    = req.params.id_card;
//   var queryUser = { _id: req.user._id };

//   User
//     .findOne(queryUser)
//     .select("lists._id lists.cards")
//     .exec(function (err, user) {
//       if (err) throw err;

//       user.lists.id(listId).cards.id(cardId).remove();
//       user.save(function (err, done) {
//         if (err) return done(err);

//         res.json({ success: true });
//       });
//   });
// };

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
>>>>>>> 1d27a25dbc414c5b7dc3e0b3955226d63041dfc5
