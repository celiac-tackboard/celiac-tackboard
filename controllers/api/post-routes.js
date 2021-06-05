const router = require('express').Router();
const { Post, Comment, User, Votes } = require('../../models');
const sequelize = require('../../config/connection');
const authguard = require('../../utils/auth');

// GET all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'post_url',
      'rating',
      'user_id',
      'location_id',
      'createdAt',
      'updatedAt',
      [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post_id = votes.post_id)'), 'votes']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//==================================================
// GET one post by ID
router.get('/:id', (req, res) => {
  Post.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'description',
        'post_url',
        'rating',
        'user_id',
        'location_id',
        'createdAt',
        'updatedAt',
        [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post_id = votes.post_id)'), 'votes']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: "no post found with this ID" });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//===================================================

// CREATE a post
router.post('/', authguard, (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
    post_url: req.body.post_url,
    rating: req.body.rating,
    user_id: req.body.user_id,
    location_id: req.body.location_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//=================================================

// UPVOTE a post
router.put('/upvote', authguard, (req, res) => {
  Votes.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbVotesData => res.json(dbVotesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//====================================================

// UPDATE a post by ID
router.put('/:id', authguard, (req, res) => {
  Post.update({
    title: req.body.title,
    description: req.body.description,
    post_url: req.body.post_url
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(500).json({ message: "no post found with this ID" });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//=====================================================

// DELETE a post by ID
router.delete('/:id', authguard, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: "no post found with this ID" });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
//======================================================

module.exports = router;