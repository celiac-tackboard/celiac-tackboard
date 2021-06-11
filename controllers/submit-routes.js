const router = require("express").Router();
const sequelize = require("../config/connection");
const { Location } = require("../models");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    Location.findAll({}).then((dbLocationData) => {
      const locations = dbLocationData.map((location) =>
        location.get({ plain: true })
      );
      res.render("submit", {
        locations,
        loggedIn: req.session.loggedIn,
      });
    });
  } else {
    res.render("login");
  }
});

module.exports = router;
