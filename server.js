const express = require('express');

const userDb = require("./users/userDb");
const postDb = require("./posts/postDb");

const server = express();


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



//custom middleware

function logger(req, res, next) { }

module.exports = server;
