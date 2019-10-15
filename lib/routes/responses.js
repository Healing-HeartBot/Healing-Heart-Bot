// eslint-disable-next-line new-cap
const router = require('express').Router();
const Response = require('../models/response');
const { moods, moodMapper } = require('../middleware/utils/mood-dictionary');

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

  .get('/heartbot', ({ query }, res, next) => {
    let arrayQuery = [];
    if(!query.moods) arrayQuery.push('random');
    else if(typeof query.moods === 'string') {
      arrayQuery.push(query.moods);
    }
    else arrayQuery = query.moods;
    const moodResult = moodMapper(moods, arrayQuery);
    arrayQuery = moodResult;
    if(arrayQuery[0] === 'random') {
      Response.aggregate([
        { $sample: { size: 1 } }
      ])
        .then(response => res.json(response))
        .catch(next);
    }
    else if(arrayQuery.length === 2) {
      Response.aggregate([
        { $match: { $and: [{ moods: arrayQuery[0] }, { moods: arrayQuery[1] }] } },
        { $sample: { size: 1 } }
      ])
        .then(response => res.json(response))
        .catch(next);
    }
    else {
      Response.aggregate([
        { $match: { $and:[{ moods: arrayQuery[0] }] } },
        { $sample: { size: 1 } }
      ])
        .then(response => res.json(response))
        .catch(next);
    }
  })

  .put('/:id', ({ params, body }, res, next) => {
    Response.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )
      .then(updatedResponse => res.json(updatedResponse))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Response.findByIdAndRemove(req.params.id)
      .then(deleted => res.json(deleted))
      .catch(next);
  });

module.exports = router;