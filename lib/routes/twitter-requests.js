// eslint-disable-next-line new-cap
const router = require('express').Router();
const TwitterReq = require('../models/twitter-request');
const PopHashtags = require('../models/pop-hashtags');


router

  .post('/', (req, res, next) => {
    TwitterReq.create(req.body)
      .then(response => res.json(response))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    TwitterReq.find()
      .then(response => res.json(response))
      .catch(next);
  })
  
  .get('/popHashtags', (req, res, next) => {
    PopHashtags.popHashtags()
      .then(hashs => res.json(hashs))
      .catch(next);
  });


module.exports = router;