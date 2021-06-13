const router = require("express").Router();
const sequelize = require("../config/connection");

const { Location, User, Post } = require("../models");

router.get("/:city", (req, res) => {
  if (req.session.loggedIn) {
    Location.findOne({
      where: {
        city_name: req.params.city,
      },
      attributes: ["id", "city_name", "state"],
      include: [
        {
          include: {
            model: User,
            attributes: ["username"],
          },
          model: Post,
          attributes: [
            "title",
            "description",
            "post_url",
            "rating",
            "user_id",
            "createdAt",
            "updatedAt",
          ],
        },
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404);
        }
        const posts = dbPostData.get({ plain: true });

        console.log(posts);
        res.render("city-posts", {
          posts,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.render("login");
  }
});

module.exports = router;
