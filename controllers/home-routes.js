const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/posts", (req, res) => {
  //need to go through and query all the relevant posts and pass them through to the handlebar
  //
  //
  //
  res.render("posts");

  //once the query is set up and returns the data we will call
  //res.render("posts", {
  // data,
  // loggedIn: req.session.loggedIn})
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
