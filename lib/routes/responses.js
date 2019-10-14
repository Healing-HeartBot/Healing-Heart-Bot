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

  .get('/random', (req, res, next) => {
    Response.count()
      .then(count => {
        const random = Math.floor(Math.random() * count);
        Response.findOne()
          .skip(random)
          .then(response => res.json(response))
          .catch(next);
      });
  })

  .get('/banana', ({ query }, res, next) => {
    // console.log(query.moods);
    let arrayQuery = [];
    if(typeof query.moods === 'string') {
      arrayQuery.push(query.moods);
    }
    else arrayQuery = query.moods;
    const moodResult = moodMapper(moods, arrayQuery);
    arrayQuery = moodResult;
    console.log(arrayQuery);
    if(arrayQuery === 'random') {
      Response.aggregate([
        {
          $sample: {
            size: 1
          }
        }
      ])
        .then(response => res.json(response))
        .catch(next);
    }
    else if(arrayQuery.length === 2) {
      Response.aggregate([
        {
          $match: {
            $and:
              [
                { moods: arrayQuery[0] },
                { moods: arrayQuery[1] }
              ]

          }
        },
        {
          $sample: {
            size: 1
          }
        }
      ])
        .then(response => res.json(response))
        .catch(next);
    }
    else {
      Response.aggregate([
        {
          $match: {
            $and:
              [
                { moods: arrayQuery[0] },
              ]

          }
        },
        {
          $sample: {
            size: 1
          }
        }
      ])
        .then(response => res.json(response))
        .catch(next);
    }
  })


  .get('/:mood1/:mood2', ({ params }, res, next) => {
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