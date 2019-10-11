const request = require('../request');
const Response = require('../../lib/models/response');

describe('Response API', () => {

  beforeEach(() => {
    return Response.deleteMany({});
  });

  const validResponse = {
    content: 'https://gph.is/2v8HV7l',
    type: 'gif',
    moods: ['sad', 'bitter']
  };

  function postResponse(response) {
    return request
      .post('/api/responses')
      .send(response)
      // .expect(200)
      .then(({ body }) => body);
  }

  it('it posts a valid response', () => {
    return postResponse(validResponse)
      .then(response => {
        expect(response).toEqual({
          ...validResponse,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all valid responses', () => {
    return postResponse(validResponse)
      .then(() => {
        return postResponse(validResponse);
      })
      .then(() => {
        return request
          .get('/api/responses')
          .expect(200)
          .then(({ body }) => {
            expect(body.length).toBe(1);
          });
      });
  });
});