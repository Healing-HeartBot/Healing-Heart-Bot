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

  const tweetMood = ent.hashtags.map(mood => {
    return mood.text;
  }); 

  return request
    .get(`http://localhost:3000/api/responses/heartbot?moods=${tweetMood[0]}`)
    .then(({ body }) => {
      console.log(body);
      const mongoReq = new TwitterReq(userData); 

      const baseMoods = moodMapper(moods, tweetMood);
      console.log(tweetMood);
      console.log(baseMoods);
      const base = baseMessages[baseMoods[0]];
      console.log('this should be a tweet sent by user', mongoReq);
      newTweeter.post('statuses/update', { status: `Hey @${user.screen_name}, ${base} ${body[0].content}` }, function(err, data) {
      
        console.log('bot tweet', data);
      });
    })
    .catch(error => {
      console.log(error);
    });

  
  // const mood = ent.hashtags[1].text;
  // const mess = baseMessages[mood];

});