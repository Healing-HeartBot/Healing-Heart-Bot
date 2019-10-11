// eslint-disable-next-line new-cap
const router = require('express').Router();
const Response = require('../models/response');

router
  .post('/', (req, res, next) => {
    Response.create(req.body)
      .then(response => res.json(response))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Response.find()
      .then(responses => res.json(responses))
      .catch(next);
  })
  .get('/:moods', ({ params }, res, next) => {
    Response.count({
      moods: params.moods
    })
      .then(count => {
        const random = Math.floor(Math.random() * count);
        Response.findOne({
          moods: params.moods
        })
          .skip(random)
          .then(response => res.json(response))
          .catch(next);
      });
  })
  .get('/:mood1/:mood2', ({ params }, res, next) => {
    console.log(params);
    Response.count({
      moods: [params.mood1, params.mood2]
    })
      .then(count => {
        const random = Math.floor(Math.random() * count);
        Response.findOne({
          moods: [params.mood1, params.mood2]
        })
          .skip(random)
          .then(response => res.json(response))
          .catch(next);
      });
  });

module.exports = router;