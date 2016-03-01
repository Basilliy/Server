var User         = require("../../app/models/user"), // load up the user model
    randomString = require("randomstring"),
    fs           = require("fs");


/**
 * get all data from current user
 */
exports.getUserData = function(req, res) {
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("-lists")
    .lean()
    .exec(function(err, user) {
      res.json({ user: user });
    });
}

/**
 * save some data to current user (with checks)
 */
exports.saveUserData = function(req, res) {
  var userData = req.body;
  var queryUser = { _id: req.user._id };

  // im using nested query, because i didn't find more pretty solution, sorry =(o_o)=
  User
    .findOne(queryUser)
    .select("-lists")
    .exec(function(err, user) {
      var currentName = user.name;
      var currentEmail = user.email;

      User
        .findOne({ $or: [{ name: userData.name }, { email: userData.email }] })
        .select("name email")
        .exec(function(err, done) {
          if (done && (done.name === userData.name) && (done.name !== currentName)) {
            return res.status(422).send({
                success: false,
                message: "This name already being used",
            });
          } else if (done && (done.email === userData.email) && (done.email !== currentEmail)){
            return res.status(422).send({
                success: false,
                message: "This email already being used",
            });
          } else {
            user.name = userData.name;
            user.email = userData.email;

            user.save(function (err) {
              if (err) return handleError(err);

              res.json({ success: true, message: "Your account has been updated." });
            });
          }
        });
    });
}

// /**
//  * save new password to current user
//  */
// exports.saveUserPassword = function(req, res) {
//   var userData = req.body;
//   var queryUser = { _id: req.user._id };

//   User
//     .findOne(queryUser)
//     .select("password")
//     .exec(function(err, user) {
//       if(!user.validPassword(userData.oldPass)) {
//         return res.status(422).send({
//             success: false,
//             message: 'The current password is incorrect'
//         });
//       } else {
//         user.password = user.generateHash(userData.newPass);

//         user.save(function (err) {
//           if (err) return handleError(err);

//           res.json({ success: true, message: "Your password has been changed." });
//         });
//       }
//     });
// }

/**
 * save avatar for user
 */
exports.saveAvatarImage = function(req, res) {
  var image     = req.body.avatar;
  var queryUser = { _id: req.user._id };

  var path        = "public/img/user-avatars/";
  var imageBuffer = decodeBase64Image(image);
  var uniqueName  = randomString.generate();
  var fullPath    = path + uniqueName + ".jpg";

  fs.writeFile(fullPath, imageBuffer.data, function(err){
      if (err) throw err;

      User
        .findOne(queryUser)
        .select("avatar")
        .exec(function(err, user) {
          if (err) throw err;

          /**
           * remove previous avatar from file system
           */
          if (user.avatar.localeCompare("default-profile.png") !== 0) {
            fs.unlink(path + user.avatar, function(err) {
               if (err) throw err;
            });
          }

          user.avatar = uniqueName + ".jpg";

          user.save(function (err) {
            if (err) return handleError(err);

            console.log(user.avatar)

            res.json({ avatar: user.avatar });
          });
      });
  });
};

exports.saveUserBackground = function(req, res) {
  var queryUser = { name: req.body.user };

  User
    .findOne(queryUser)
    .select("-lists")
    .exec(function(err, user) {
      user.background = req.body.background;

      user.save(function (err) {
        if (err) return handleError(err);
        res.json({ success: true });
      });
    });
}

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
}
