const request = require('../request');
const db = require('../db');

describe('Testing Twitter Request Routes', () => {
  beforeEach(() => db.dropCollection('twitterreqs'));

  const newTwit = {
    twitId: '146fg28f',
    location: 'Portland, OR',
    followers: 56,
    hashtags: [{ text: 'mad' }],
    time: new Date(),
    tweet: 'whats up heartbot'
  };

  const newTwit2 = {
    twitId: '146fg28fg',
    location: 'Portland, OR',
    followers: 56,
    hashtags: [{ text: 'mad' }],
    time: new Date(),
    tweet: 'whats up heartbot'
  };

  function postTwitReq(newTweet) {
    return request
      .post('/api/twitreq')
      .expect(200)
      .send(newTweet)
      .then(({ body }) => body);
  }

  it('posts a new tweet', () => {
    return postTwitReq(newTwit).then(newTwit => {
      expect(newTwit).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          time: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "hashtags": Array [
            Object {
              "text": "mad",
            },
          ],
          "location": "Portland, OR",
          "time": Any<String>,
          "tweet": "whats up heartbot",
          "twitId": "146fg28f",
        }
      `
      );
    });
  });

  it('gets all tweet info', () => {
    return Promise.all([postTwitReq(newTwit), postTwitReq(newTwit2)]).then(
      () => {
        return request
          .get('/api/twitreq')
          .expect(200)
          .then(({ body }) => {
            expect(body.length).toBe(2);
          });
      }
    );
  });
});
