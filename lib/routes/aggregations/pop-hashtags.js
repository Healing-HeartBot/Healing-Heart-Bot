// eslint-disable-next-line new-cap
const router = require('express').Router();
const PopularHashtags = require('../../models/twitter-request');


router
  
  .get('/', (req, res, next) => {
    PopularHashtags.popHashtags()
      .then(hashes => res.json(hashes))
      .catch(next);
  });


module.exports = router;