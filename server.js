const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter')
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger)
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(`Method: ${req.method} request`)
  console.log(`URL: ${req.url}`)
  console.log(`AT: ${new Date().toISOString()}`)
  next();
}

module.exports = server;
