// eslint-disable-next-line new-cap
const router = require('express').Router();
const UserByTime = require('../../models/twitter-request');

router
  .get('/', (req, res, next) => {
    UserByTime.userByTime()
      .then(users => res.json(users))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const twitterId = req.params.id;
    UserByTime.userByTime(twitterId)
      .then(users => res.json(users))
      .catch(next);
  });
   
module.exports = router;