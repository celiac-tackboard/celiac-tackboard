const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Location } = require('../models');
const authguard = require('../utils/auth');


router.get('/', authguard, (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] },
        where: {
            id: req.session.id
        },
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'rating',
                    'description',
                    'created_at',
                    // [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post.id = votes.post_id)'), 'votes_count']
                ]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    })
        .then(dbUserData => {
            const posts = dbUserData.map(post => post.get({ plain: true }));
            res.render('profile', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.get('/', authguard, (req, res) => {
//     Post.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'post_url',
//             'title',
//             'rating',
//             'description',
//             'created_at',
//             [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post.id = votes.post_id)'), 'votes_count']
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//         .then(dbPostData => {
//             const posts = dbPostData.map(post => post.get({ plain: true }));
//             res.render('profile', { posts, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/edit/:id', authguard, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'rating',
            'description',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post.id = votes.post_id)'), 'votes_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            }
        ]
    })
        .then(dbPostData => {
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.get('/', (req, res) => {
//     Comment.findAll({
//         where:
//         {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'post_url'
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//       .then(dbCommentData =>  { const comments = dbCommentData.map(comment => comment.get({ plain: true }));
//       console.log(comments);
//       res.render('profile', { comments, loggedIn: true });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });


//   router.get('/', (req, res) => {
//     Comment.findAll({
//         where:
//         {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'comment_text'
//         ]

//     })
//     .then(dbCommentData =>  { const comments = dbCommentData.map(comment => comment.get({ plain: true }));
//     console.log(comments);
//     res.render('profile', { comments, loggedIn: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
//   });

  
module.exports = router;