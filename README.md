# Healing Heart Bot

[Twitter](http://www.twitter.com/heartbotbb)
[Back End](https://radiant-dawn2.herokuapp.com/)
[Front End](https://heartbotbb.herokuapp.com/)

Healing Heart Bot is a Twitter bot designed to help you get through a breakup by sharing supportive messages when you tweet at it. Depending on the mood you share via a Twitter hashtag, the bot will tweet back at you with a message, GIF, or song specifically tagged to match that mood. You can also share your own advice with the bot that it will in turn tweet out to others. 

## How It Works
The Twitter bot is set up to listen for any tweets that @ mentions its name (HeartBotBB). 

If you mention the bot along with the hashtag #staystrongbb, it will take the content of your tweet and add it to the response database as a message that other users can then receive. 

You can also access the response bot on the front end by going to http://heartbotbb.herokuapp.com/ and selecting a mood from the dropdown to get a response displayed on the page. 

## Seeding Response to Local Database
* First make sure your database is empty before seeding in the data. Use a tool like MongoDB Compass to dump any collections currently in the database. 
* In your terminal, run ‘node seed-data.js’ 

## How to Tweet   
* To Get a Response from the Bot
    * Tweet at @HeartBotBB with any message. If you’d like to share how you’re feeling, add the mood with a hashtag.
    * For example: Hey @HeartBotBB, I’m feeling #down today. Can you help a friend?
    * HeartBot will tweet at you with a response that corresponds to your mood, or give a random response if you haven’t provided a mood. 
* Submit a Response
    * Tweet at @HeartBotBB along with the hashtag ‘staystrongbb’ and include a piece of advice, a link to a Giphy GIF, or a link to a Spotify song. 
    * For example: @HeartBotBB Someone said tis better to have loved and lost than never to have loved at all. #staystrongbb
    * HeartBot will like your tweet and your content will be added to our database of responses. 

## Data Aggregation
We have routes set up to see data from the bot’s usage, including:
* Most commonly used hashtags
* User's hashtags and messages over time
* Moods by time of day

## How It’s Built
Healing Heart Bot is built using Node.js, MongoDB, and Express for our database and API. We seeded the database with 145 initial responses that are each tagged with at least one of our six base moods (mad, sad, lonely, weak, bitter, hopeful). 

In order to not limit a user to only tweeting certain hashtags, we created a mood dictionary as an object where the keys are each of our six moods and the values are a long list of synonyms. Each time a tweet comes through, the hash-tagged moods are run through the moodMapper function to see if it exists in our list of synonyms and then provide the corresponding base mood to the API call. If no match is found, a random message is served up. 

The same mood is then used to find a generic message to send before the actual response and to ping the API with the mood(s) as a query parameter and return a single random response based on the mood. 

We used the Twit NPM package to set up a Twitter bot. The entire project is deployed to Heroku. On the front end, it’s pinging the Giphy API to embed the GIFs onto the page. 

## Our Team
This app was made at Alchemy Code Lab by:
Abbey Masters
Alex Spencer
Allison Busse
Maeve Griffin
Pat Haynes
