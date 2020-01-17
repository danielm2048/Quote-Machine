const router = require('express').Router();
let Quote = require('./quotes.model');

router.route('/api').get((req, res) => {
  Quote.find()
    .then(quotes => res.json(quotes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/add').post((req, res) => {
    const text = req.body.text;
    const author = req.body.author;
    const picture = req.body.picture;
    const type = req.body.type;
  
    const newQuote = new Quote({
      text,
      author,
      picture,
      type,
    });
  
    newQuote.save()
    .then(() => res.json('Quote added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;