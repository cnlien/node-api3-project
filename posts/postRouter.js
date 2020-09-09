const express = require('express');

const Posts = require('./postDb.js')

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error loading the posts",
        err
      })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The posts with that ID does not exisit"
          })
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error retreiving the post",
        error: err
      })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(parseInt(req.params.id))
    .then((post) => {
      post
        ? res.status(200).json({ post, message: "The post was successfully deleted" })
        : res.status(404).json({ message: "The post does not exist" })
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error deleting the post", error: err })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      post
        ? res.status(200).json({ post, message: "The post was updated" })
        : res.status(404).json({ message: "The user does not exisit" })
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error with the server",
        error: err
      })
    })
});

function validatePostId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
    .then((postid) => {
      !postid
        ? res.status(404).json({ message: "invalid user id"})
        : next()
    })
}

module.exports = router;
