// load the things that we need
var auth      = require("../app/routes/auth"),
    user      = require("../app/routes/user"),
    list      = require("../app/routes/list"),
    card      = require("../app/routes/card"),
    path      = require("path");

module.exports = function(app) {

  /**
   * auth stuff
   **/
  app.post("/auth/signup", auth.signup);
  app.post("/auth/login", auth.login);


  /**
   * user stuff
   **/
  app.get("/api/user", user.getUserData);
  app.put("/api/user", user.saveUserData);
  // app.post("/api/user", user.saveUserPassword);
  app.put("/api/user/avatar", user.saveAvatarImage);
  app.put("/api/user/background", user.saveUserBackground);

  /**
   * list stuff
   **/
  app.get("/api/user/:user/lists", list.getLists);
  app.post("/api/user/:user/lists", list.addList);
  app.delete("/api/user/:user/lists/:id", list.removeList);
  app.put("/api/user/:user/lists/:id", list.updateList)
  app.post("/api/user/:user/lists/sort", list.sortList);

  /**
   * card stuff
   **/
  app.post("/api/user/:user/lists/:list/cards", card.addCard);
  // app.get("/api/lists/:id_list/card", card.getcards);
  // app.get("/api/lists/:id_list/card/:id_card", card.getcard);
  // app.put("/api/lists/:id_list/card/:id_card", card.updatecard);
  // app.delete("/api/lists/:id_list/card/:id_card", card.removecard);

  // redirect all others router to the index (HTML5 history)
  app.all("/*", function(req, res) {
      res.sendFile(path.resolve("public/index.html"));
  });
};
