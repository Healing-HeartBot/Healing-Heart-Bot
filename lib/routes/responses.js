// eslint-disable-next-line new-cap
const router = require('express').Router();
const Response = require('../models/response');

router
  .post('/', (req, res, next) => {
    Response.create(req.body)
      .then(response => res.json(response))
      .catch(next);
  });

module.exports = router;