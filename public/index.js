import { getResponse } from './util/helper-functions.js';
const form = document.getElementById('form')
const response = document.getElementById('response');

form.addEventListener('submit', event => {
  event.preventDefault();
  const mood = form.dropdown.value;
  getResponse(mood)
    .then(receivedResponse => {
      const botResponse = receivedResponse[0].content;
      console.log(botResponse);
      if(botResponse.includes('gph')) {
        const giphyImage = document.createElement('iframe');
        giphyImage.src = botResponse;
        response.append(giphyImage);
      }
      if(botResponse.includes('spotify')){
        const spotifyPlayer = document.createElement('iframe');
        spotifyPlayer.src = botResponse.slice(0, 25) + 'embed/' + botResponse.slice(25);
        spotifyPlayer.width = 300;
        spotifyPlayer.height = 380;
        spotifyPlayer.frameBorder = 0;
        spotifyPlayer.allowtransparency = 'true';
        spotifyPlayer.allow = 'encrypted-media';
        console.log(spotifyPlayer);
        response.append(spotifyPlayer);
      }
    })
})

/* <iframe src="https://giphy.com/embed/nnYkNPnxysc5W" width="480" height="475" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/nnYkNPnxysc5W">via GIPHY</a></p> */

/* <div style="width:100%;height:0;padding-bottom:99%;position:relative;"><iframe src="https://giphy.com/embed/nnYkNPnxysc5W" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/nnYkNPnxysc5W">via GIPHY</a></p> */

// https://gph.is/1zeXWUA