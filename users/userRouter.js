const express = require("express");

const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.use(express.json());

router.post("/", validateUser, (req, res) => {
  const userInfo = req.body;

  userDb
    .insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/:id/posts", (req, res) => {
  const postData = req.body;

  postDb
    .insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "No users with that id" });
      }
    })
    .catch(err => {
      res.status(500).json(error);
    });
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "No users with that id" });
  }
  userDb
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "User has been deleted" });
      } else {
        res.status(404).json({ message: "That user does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;

  userDb
    .update(id, userInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "That user does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function validateUser(req, res, next) {
  const newUser = req.body;

  if (!newUser) {
    res.status(400).json({ message: "missing user data" });
  } else if (!newUser.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
