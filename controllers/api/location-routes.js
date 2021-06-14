const router = require('express').Router();
const { Location } = require('../../models');
const sequelize = require('../../config/connection');

router.post("/", (req, res) => {
    Location.create({
      city_name: req.body.city_name,
      state: req.body.state,
    })
      .then((dbLocationData) => res.json(dbLocationData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;