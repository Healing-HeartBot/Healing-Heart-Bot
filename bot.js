require('dotenv').config();

const Twit = require('twit');

const newTweeter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000, 
  strictSSL: true,    
});


const stream = newTweeter.stream('statuses/filter', { track: '#bbtheHeartBot', language: 'en' })

stream.on('tweet', function(tweet) {
  const user = tweet.user.screen_name;
  newTweeter.post('statuses/update', { status: `@${user} I can respond with a bot based on a hashtag, so sorry to anyone who fallows me I'm testing for a project an my other acct isn't approved yet` }, function(err, data, response) {
    console.log(data)
  });
  
  console.log(tweet)
});