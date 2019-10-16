import { getResponse, getGiphy } from './util/helper-functions.js';
const form = document.getElementById('form')
const response = document.getElementById('response');
// const textBox = document.getElementById('text-box')

form.addEventListener('submit', event => {
  event.preventDefault();
  while(response.hasChildNodes()) {
    response.removeChild(response.firstChild);
  }
  const mood = form.dropdown.value;
  getResponse(mood)
    .then(receivedResponse => {
      const botResponse = receivedResponse[0].content;
      console.log(botResponse);
      if(botResponse.includes('giphy')) {
        const giphyId = botResponse.slice(23, botResponse.length - 1);
        getGiphy(giphyId)
          .then(gifData => {
            const giphyImage = document.createElement('iframe');
            giphyImage.src = gifData.data.embed_url;
            giphyImage.border = 0;
            giphyImage.width = gifData.data.images.downsized_small.width;
            giphyImage.height = gifData.data.images.downsized_small.height;
            response.append(giphyImage);
          })
      }
      else if(botResponse.includes('spotify')){
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
      else {
        const textBox = document.createElement('div')
        textBox.classList.add('text-box');
        const p = document.createElement('p');
        p.innerHTML = botResponse;
        textBox.append(p);
        response.append(textBox);
      }
    })
})
