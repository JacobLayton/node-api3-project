const express = require('express');

const postDb = require("./postDb");

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  postDb.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "No posts with that id" })
      }
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  postDb.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "Post has been deleted" });
      } else {
        res.status(404).json({ message: "That post does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const postInfo = req.body;

  postDb.update(id, postInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Cannot update non-existent post" })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
