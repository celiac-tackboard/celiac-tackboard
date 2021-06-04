const router = require('express').Router();
const { Post, User, Votes, Location, Comment } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
  Post.findAll({
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a post
router.get('/', (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
    post_url: req.body.post_url,
    user_id: req.body.user_id,
    location_id: req.body.location_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;