// eslint-disable-next-line new-cap
const router = require('express').Router();
const MoodByTime = require('../../models/twitter-request');


router
  
  .get('/', (req, res, next) => {
    MoodByTime.moodByTime()
      .then(moods => res.json(moods))
      .catch(next);
  });


module.exports = router;