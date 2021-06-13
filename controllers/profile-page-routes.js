const { Post, User, Comment } = require("../models");
const authguard = require("../utils/auth");
const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', authguard, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
      [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post.id = votes.post_id)'), 'votes']
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
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('profile-page', {
          posts,
          loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/comments', (req, res) => {
  Comment.findAll({
    where: {
      user_id: req.session.user_id
    },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'description']
      }
    ]
  })
    .then(dbCommentData => {
      const comments = dbCommentData.map(comment => comment.get({ plain: true }));
      res.render('profile-page-comments', {
        comments,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;