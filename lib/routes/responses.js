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
    const query = typeof query.moods === 'string' ?
      moodMapper([query.moods]) :
      moodMapper(query.moods);

    // no need for all the if/else stuff.
    // if arrayQuery is empty the and will be empty and should work
    // like the old random case.
    Response.aggregate([
      { $match: { $and: query.map(moods => ({ moods })) } },
      { $sample: { size: 1 } }
    ])
      .then(response => res.json(response))
      .catch(next);
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
