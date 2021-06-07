<<<<<<< HEAD
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
=======
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Location } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session)
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'description',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM votes where post.id = votes.post_id)'), 'votes_count']
        ],
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
        .then(dbPostData => {
            console.log(dbPostData[0]);
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'description',
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM votes WHERE post.id = votes.post_id)'), 'votes_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
>>>>>>> f8406466d110c350364935fba78486b85296a796
});

router.get("/posts", (req, res) => {
  //need to go through and query all the relevant posts and pass them through to the handlebar
  //
  //
  //
  res.render("posts");

  //once the query is set up and returns the data we will call
  //res.render("posts", {
  // data,
  // loggedIn: req.session.loggedIn})
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
