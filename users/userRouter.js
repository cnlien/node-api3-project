const express = require('express');

const Users = require('./userDb.js');
const Posts = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(500).json({

      })
    })
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      user 
        ? res.status(200).json(user)
        : res.status(404).json({
          message: "The user with that ID does not exisit"
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error retreving the user from the database",
        err
      })
    })
});

router.get('/:id/posts', (req, res) => {
  const userId = parseInt(req.params.id)
  Users.getUserPosts(userId)
    .then((userPosts) => {
      userPosts.length != 0
        ? res.status(200).json(userPosts)
        : res.status(404).json({
            messaage: "There are no posts by this user or this user does not exist"
          })
    })
    .catch((err) => {
      res.status(500).json({
        message: "The was an eror retreving the posts from the database",
        err
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
