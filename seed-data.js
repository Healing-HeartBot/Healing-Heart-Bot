const request = require('superagent');
const seedData = require('./data/response');

function postResponse(response) {
  return request
    .post('http://localhost:3000/api/responses')
    .send(response)
    .then(({ body }) => body)
    .catch(err => {
      console.log(err);
    });
}

Promise.all(
  seedData.map(seed => {
    return postResponse(seed)
      .then(thing => {
        console.log(thing);
      });
  })
).then(() => {
  console.log('done');
});
