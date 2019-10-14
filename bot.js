require('dotenv').config();
const TwitterReq = require('./lib/models/twitter-request');
const baseMessages = require('./lib/middleware/utils/generic-messages');
const Twit = require('twit');

const newTweeter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  strictSSL: true,    
});


const stream = newTweeter.stream('statuses/filter', { track: '#71f45a07dbd91a59fa47c23abcd', language: 'en' });

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
  
  const mood = ent.hashtags[1].text;
  const mess = baseMessages[mood];
  const mongoReq = new TwitterReq(userData); 
  console.log('this should be a tweet sent by user', mongoReq);
  newTweeter.post('statuses/update', { status: `${user.user_name} ${mess} ${response}` }, function(err, data, response) {
  
    console.log('bot tweet', data);
  });

});