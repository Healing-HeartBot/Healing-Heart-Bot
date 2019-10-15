require('dotenv').config();
const TwitterReq = require('./lib/models/twitter-request');
const baseMessages = require('./lib/middleware/utils/generic-messages');
const { moodMapper, moods } = require('./lib/middleware/utils/mood-dictionary');
const request = require('superagent');
const Twit = require('twit');

const newTweeter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  strictSSL: true,
});

const stream = newTweeter.stream('statuses/filter', { track: '@heartbotbb', language: 'en' });

stream.on('tweet', function(tweet) {
  const user = tweet.user;
  const ent = tweet.entities;
  const userData = {
    twitId: user.id,
    location: user.location,
    followers: user.followers,
    hashtags: ent.hashtags,
    time: tweet.created_at,
    tweet: tweet.text
  };
  console.log('hashtag', ent.hashtags);
  console.log('tweet1', tweet.entities);
  console.log('tweet2', tweet.text);

  for(let i = 0; i < ent.hashtags.length; i++) {
    if(ent.hashtags[i].text === 'staystrongbb') {
      return request
        .post('http://localhost:3000/api/responses')
        .send({ content: userData.tweet })
        .then(tweet => {
          console.log(tweet);
        });
    }
  }


  let tweetMood = ent.hashtags.map(mood => {
    return `moods=${mood.text}`;
  });
  if(tweetMood.length > 1) {
    tweetMood = tweetMood.join('&');
  }

  return request
    .get(`http://localhost:3000/api/responses/heartbot?${tweetMood}`)
    .then(({ body }) => {
      const mongoReq = new TwitterReq(userData);
      const baseMoods = moodMapper(moods, tweetMood);
      const base = baseMessages[baseMoods[0]];
      console.log('this should be a tweet sent by user', mongoReq);
      newTweeter.post('statuses/update', { status: `Hey @${user.screen_name}, ${base} ${body[0].content}` }, function(err, data) {
        console.log('bot tweet', data);
      });
    })
    .catch(error => {
      console.log(error);
    });

});