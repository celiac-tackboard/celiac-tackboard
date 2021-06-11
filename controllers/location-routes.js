const router = require("express").Router();
const sequelize = require("../config/connection");
const { Location, Comment } = require("../models");

router.get("/location/:city", (req, res) => {
  if (req.session.loggedIn) {
    Location.findAll({
      where: {
        city: req.params.city,
      },
      attributes: [
        "id",
        "post_url",
        "title",
        "description",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM votes where post.id = votes.post_id)"
          ),
          "votes_count",
        ],
      ],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    }).then((dbLocationData) => {
      const locations = dbLocationData.map((location) =>
        location.get({ plain: true })
      );
      //   res.render("submit", {
      //     locations,
      //     loggedIn: req.session.loggedIn,
      //   });
      res.json(dbLocationData);
    });
  } else {
    res.render("login");
  }
});

module.exports = router;
