const express = require("express");
const cors = require("cors");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(cors());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

//custom middleware

// This logger will
function logger(req, res, next) {
  const host = req.get("host");
  // host is good for local env, but if using cross-origin requests do the following:
  // var origin = req.get('origin');
  // and change ${host} to ${origin} on line 27
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${host}`
  );

  next(); // next just points to the next middleware in the queue
}

module.exports = server;
