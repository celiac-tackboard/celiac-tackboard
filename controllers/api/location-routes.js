const router = require("express").Router();
const sequelize = require("../../config/connection");

const { Location, User, Post } = require("../../models");

router.get("/:city", (req, res) => {
  Location.findOne({
    where: {
      city_name: req.params.city,
    },
    attributes: ["id", "city_name", "state"],
    include: [
      {
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
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404);
      }
      console.log(res.json(dbPostData));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
