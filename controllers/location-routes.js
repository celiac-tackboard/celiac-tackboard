const router = require("express").Router();
const sequelize = require("../config/connection");

const { Location, User, Post, Comment } = require("../models");

router.get("/:city", (req, res) => {
  if (req.session.loggedIn) {
    Post.findAll({
      where: {
        location_id: req.params.city,
      },
      order: [["created_at", "DESC"]],
      attributes: [
        "id",
        "post_url",
        "title",
        "description",
        "created_at",
        "location_id",
        "rating",
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
        {
          model: Location,
          attributes: ["city_name", "state"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404);
        }
        const posts = dbPostData.map((post) => post.get({ plain: true }));

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
