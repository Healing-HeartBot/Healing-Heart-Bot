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
stream.on('error', console.error);
stream.on('connected', () => console.log('we connect'));
stream.on('disconnected', () => console.log('im disconnected'));

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

  if(user.id === '1182728176755064800') {
    stream.stop();
  }

  postTwitReq(userData);

  const parseTweet = tweet.text.replace(/([@#][\w_-]+)\s/gi, '');
  const tweetId = tweet.id_str;
  let routeCondition = false;

  for(let i = 0; i < ent.hashtags.length; i++) {
    if(ent.hashtags[i].text === 'staystrongbb') routeCondition = true;
  }
  
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

        const base = baseMessages[baseMoods[0]];
        const index = pickMood(base.length);
        console.log('this should be a tweet sent by user', mongoReq);
        newTweeter.post('statuses/update', { status: `Hi @${user.screen_name}. ${base[index]} ${body[0].content}` }, function(err, data) {
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