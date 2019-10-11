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
    moods: ['bitter', 'sad']
  };

  const validResponse6 = {
    content: 'response6',
    type: 'song',
    moods: ['sad', 'weak']
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

  it('gets a random response, when no mood is provided', () => {
    return Promise.all([
      postResponse(validResponse),
      postResponse(validResponse2),
      postResponse(validResponse3),
      postResponse(validResponse4),
      postResponse(validResponse5),
      postResponse(validResponse6)
    ]).then(() => {
      return request
        .get('/api/responses/random')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              content: expect.any(String),
              moods: expect.any(Array),
              type: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "content": Any<String>,
              "moods": Any<Array>,
              "type": Any<String>,
            }
          `
          );
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
        .get('/api/responses/random')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              content: expect.any(String),
              moods: expect.any(Array),
              type: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "content": Any<String>,
              "moods": Any<Array>,
              "type": Any<String>,
            }
          `
          );
        });
    });
  });

  it('gets a response based on two moods', () => {
    return Promise.all([
      postResponse(validResponse),
      postResponse(validResponse2),
      postResponse(validResponse3),
      postResponse(validResponse4),
      postResponse(validResponse5),
      postResponse(validResponse6)
    ]).then(() => {
      return request
        .get('/api/responses/sad/bitter')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              content: expect.any(String),
              moods: expect.any(Array),
              type: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "content": Any<String>,
              "moods": Any<Array>,
              "type": Any<String>,
            }
          `
          );
        });
    });
  });

  it('finds a response by an id and updates', () => {
    return postResponse(validResponse3).then(response => {
      return request
        .put(`/api/responses/${response._id}`)
        .send({ content: 'this is new content' })
        .expect(200)
        .then(({ body }) => {
          expect(body.content).toBe('this is new content');
        });
    });
  });

  it('deletes a response by id', () => {
    return postResponse(validResponse3).then(response => {
      return request
        .delete(`/api/responses/${response._id}`)
        .expect(200)
        .then(() => {
          return request
            .get('/api/responses')
            .expect(200)
            .then(({ body }) => {
              expect(body.length).toBe(0);
            });
        });
    });
  });
});
