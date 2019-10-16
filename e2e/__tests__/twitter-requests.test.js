const request = require('../request');
const TwitterReq = require('../../lib/models/twitter-request');

describe('Testing Twitter Request Routes', () => {
  const newTwit = {
    twitId: '146fg28f',
    location: 'Portland, OR',
    followers: 56,
    hashtags: [{ text: 'mad' }],
    time: 'March 3, 2019 04:06:06',
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
        { _id: expect.any(String) },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "followers": 56,
          "hashtags": Array [
            Object {
              "text": "mad",
            },
          ],
          "location": "Portland, OR",
          "time": "March 3, 2019 04:06:06",
          "tweet": "whats up heartbot",
          "twitId": "146fg28f",
        }
      `
      );
    });
  });
});
