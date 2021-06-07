const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/posts", (req, res) => {
  res.render("posts");
});

module.exports = router;
