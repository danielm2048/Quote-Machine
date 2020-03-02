const router = require("express").Router();
const Comment = require("../models/comments.model");

const auth = require("../middleware/auth");

router.route("/:qid").get((req, res) => {
  Comment.find({ quoteId: req.params.qid })
    .sort("-createdAt")
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post(auth, (req, res) => {
  const { userName, quoteId, text } = req.body;

  if (!text) {
    return res.status(400).json("Your comment is empty!");
  }

  const newComment = new Comment({
    userName,
    quoteId,
    text
  });

  newComment
    .save()
    .then(() => res.json("Comment added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:cid").delete(auth, (req, res) => {
  Comment.deleteOne({ _id: req.params.cid })
    .then(() => res.json("Comment deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
