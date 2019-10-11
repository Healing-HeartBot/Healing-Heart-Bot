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

  const validResponse2 = {
    content:
      'https://open.spotify.com/track/44ADyYoY5liaRa3EOAl4uf?si=sm12QRuDQIm2Ku25LHJBIA',
    type: 'song',
    moods: ['sad', 'bitter']
  };

  const validResponse3 = {
    content:
      'https://open.spotify.com/track/7m8PEWF1Qjo4BmcjEYsacr?si=2IuxzCmsSfqX0WQ3S8qp0Q',
    type: 'song',
    moods: ['alex is lonely', 'sad']
  };

  const validResponse4 = {
    content: 'response4',
    type: 'song',
    moods: ['sad', 'sad']
  };

  const validResponse5 = {
    content: 'response5',
    type: 'song',
    moods: ['lonelyAlex', 'sad']
  };

  const validResponse6 = {
    content: 'response6',
    type: 'song',
    moods: ['sad', 'weakAlex']
  };

  function postResponse(response) {
    return (
      request
        .post('/api/responses')
        .send(response)
        // .expect(200)
        .then(({ body }) => body)
    );
  }

  it('it posts a valid response', () => {
    return postResponse(validResponse).then(response => {
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

  it('is going to get a random response by mood', () => {
    return Promise.all([
      postResponse(validResponse),
      postResponse(validResponse2),
      postResponse(validResponse3),
      postResponse(validResponse4),
      postResponse(validResponse5),
      postResponse(validResponse6)
    ]).then(() => {
      return request
        .get('/api/responses/sad')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body).toMatchInlineSnapshot(`
            Object {
              "__v": 0,
              "_id": "5da0f793f3e1e258aef29c5e",
              "content": "response5",
              "moods": Array [
                "lonelyAlex",
                "sad",
              ],
              "type": "song",
            }
          `);
        });
    });
  });
});
