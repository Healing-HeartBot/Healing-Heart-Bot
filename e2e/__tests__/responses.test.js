const request = require('../request');

describe('Response API', () => {

  const validResponse = {
    content: 'https://gph.is/2v8HV7l',
    type: 'gif',
    moods: ['sad', 'bitter']
  };

  function postResponse(response) {
    return request
      .post('/api/responses')
      .send(response)
      .expect(200)
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
  
});