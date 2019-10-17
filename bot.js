require('dotenv').config();
const TwitterReq = require('./lib/models/twitter-request');
const genericMessages = require('./lib/middleware/utils/generic-messages');
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
stream.on('error', console.error);
stream.on('connected', () => console.log('We are connected!'));
stream.on('disconnected', () => console.log('It is disconnected!'));

process.on('SIGTERM', () => {
  stream.stop();
});

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

  if(user.id === process.env.TWITTER_BOT_ID) {
    stream.stop();
  }

  postTwitReq(userData);

  let routeCondition = false;
  
  for(let i = 0; i < ent.hashtags.length; i++) {
    if(ent.hashtags[i].text === 'staystrongbb') routeCondition = true;
  }
  
  const parseTweet = tweet.text.replace(/([@#][\w_-]+)\s/gi, '');
  const tweetId = tweet.id_str;
  
  if(routeCondition) {
    return request
      .post(`${process.env.BASE_URL}/api/responses`)
      .send({ content: parseTweet })
      .then(() => {
        newTweeter.post('favorites/create', { id: tweetId }, function(err, data) {
          console.log('liked tweet', data);
        });
      });
  }
  else {
    let tweetMood = ent.hashtags.map(mood => {
      return `moods=${mood.text}`;
    });
    let mappedMood = ent.hashtags.map(mood => {
      return mood.text;
    });

    if(tweetMood.length > 1) {
      tweetMood = tweetMood.join('&');
    }
    return request
      .get(`${process.env.BASE_URL}/api/responses/heartbot?${tweetMood}`)
      .then(({ body }) => {
        const mongoReq = new TwitterReq(userData);
        const baseMoods = moodMapper(moods, mappedMood);

        const pickMood = function(num) {
          const pickedMood = Math.floor(Math.random() * num);
          return pickedMood;
        };

        const moodMessageArray = genericMessages[baseMoods[0]];
        const index = pickMood(moodMessageArray.length);
        console.log('this should be a tweet sent by user', mongoReq);
        newTweeter.post('statuses/update', { status: `Hi @${user.screen_name}. ${moodMessageArray[index]} ${body[0].content}` }, function(err, data) {
          console.log('bot tweet', data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
});

function postTwitReq(newTweet) {
  return request
    .post(`${process.env.BASE_URL}/api/twitreq`)
    .send(newTweet)
    .then(({ body }) => body);
}