const router = require('express').Router();
const { Comment } = require('../../models');
const authguard = require('../../utils/auth');

// GET all comments
router.get('/', (req, res) => {
  Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//==========================================================

// GET  a comment by ID
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment with this ID found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//===========================================================

// CREATE a comment
router.post('/', authguard, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.body.user_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//==========================================================

// UPDATE a comment
router.put('/:id', authguard, (req, res) => {
  Comment.update({
    comment_text: req.body.comment_text
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if(!dbCommentData) {
        res.status(404).json({ message: "No comment with this ID found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//=============================================================

// DELETE a comment
router.delete('/:id', authguard, (req, res) => {
  Comment.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment with this ID found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//===============================================================

module.exports = router;