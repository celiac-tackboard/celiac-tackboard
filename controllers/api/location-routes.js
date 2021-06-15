const router = require('express').Router();
const { Location } = require('../../models');
const sequelize = require('../../config/connection');
const { RSA_NO_PADDING } = require('constants');

router.get('/', (req, res) => {
  Location.findAll({})
    .then(dbLocationData => {res.json(dbLocationData)})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

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

router.delete('/:id', (req, res) => {
  Location.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbLocationData => {
      if (!dbLocationData) {
        res.status(404).json({ message: "no location found with this ID" });
        return;
      }
      res.json(dbLocationData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;