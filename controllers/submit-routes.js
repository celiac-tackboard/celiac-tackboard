const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Location } = require('../models');
const authguard = require('../utils/auth');

router.get('/', (req, res) => {
  Location.findAll({})
    .then(dbLocationData => {
      const locations = dbLocationData.map(location => location.get({ plain: true }));
      res.render('submit', { locations });
    })
})

module.exports = router;