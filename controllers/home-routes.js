const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Location } = require("../models");
let data = [];

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    Post.findAll({
      attributes: [
        "id",
        "post_url",
        "title",
        "description",
        "created_at",
        "location_id",
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
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts);

        Location.findAll({}).then((dbLocationData) => {
          const locations = dbLocationData.map((location) => {
            // location.get({ plain: true });
            data.push(location.get({ plain: true }));
            console.log(location);
          });
          data.push(...posts);
          console.log(data);
        });

        res.render("homepage", {
          data,
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
  data = [];
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/post/:id", (req, res) => {
  if (req.session.loggedIn) {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "post_url",
        "title",
        "description",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT (*) FROM votes WHERE post.id = votes.post_id)"
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
        },
      ],
    })
      .then((dbPostData) => {
        const post = dbPostData.get({ plain: true });

        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.render("single-post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
