const router = require("express").Router();
const Like = require("../models/likes.model");

const auth = require("../middleware/auth");

router.route("/:uid").get(auth, (req, res) => {
  Like.find({ userId: req.params.uid })
    .sort("-updatedAt")
    .then(likes => res.json(likes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:uid/:qid").put(auth, (req, res) => {
  const filter = { userId: req.params.uid, quoteId: req.params.qid };
  const update = { active: req.body.active };
  Like.findOneAndUpdate(
    filter,
    update,
    { new: true, upsert: true },
    (err, doc) => {
      if (err) return res.status(400).send("Error is: " + err);
      return res.json(doc);
    }
  );
});

module.exports = router;
