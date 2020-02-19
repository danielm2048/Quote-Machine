const router = require("express").Router();
const Quote = require("../models/quotes.model");

const auth = require("../middleware/auth");

router.route("/").get((req, res) => {
  Quote.find()
    .then(quotes => res.json(quotes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post(auth, (req, res) => {
  const text = req.body.text;
  const author = req.body.author;
  const picture = req.body.picture;
  const type = req.body.type;

  const newQuote = new Quote({
    text,
    author,
    picture,
    type
  });

  newQuote
    .save()
    .then(() => res.json("Quote added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/liked").post(auth, (req, res) => {
  const filter = req.body.likes;
  Quote.find({ _id: { $in: filter } })
    .select("_id text author type")
    .then(quotes => res.json(quotes))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
