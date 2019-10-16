// eslint-disable-next-line new-cap
const router = require('express').Router();
const TwitterReq = require('../models/twitter-request');


router

  .post('/', (req, res, next) => {
    TwitterReq.create(req.body)
      .then(response => res.json(response))
      .catch(next);
  });


module.exports = router;