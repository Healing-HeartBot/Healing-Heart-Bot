import { getResponse, getGiphy, getArticle } from './util/helper-functions.js';
const form = document.getElementById('form')
const response = document.getElementById('response');
const logo = document.getElementById('logo')
const head = document.getElementById('robot-head')
const right = document.getElementById('robot-right')
const left = document.getElementById('robot-left')
const feet = document.getElementById('robot-feet')
// const textBox = document.getElementById('text-box')

form.addEventListener('submit', event => {
  setTimeout(() => {
    head.classList.remove('hidden');
    right.classList.remove('hidden');
    left.classList.remove('hidden');
    feet.classList.remove('hidden');
  }, 300);
  logo.classList.add('animate');
  event.preventDefault();
  while (response.hasChildNodes()) {
    response.removeChild(response.firstChild);
  }
  const mood = form.dropdown.value;
  getResponse(mood)
    .then(receivedResponse => {
      const botResponse = receivedResponse[0].content;
      const botArticle = receivedResponse[0].type;
      if (botArticle.includes('Article')) {
        const article = document.createElement('iframe');
        article.src = botResponse;
        article.width = '800vw';
        article.height = '600vh';
        response.append(article);
      }

      else if (botResponse.includes('giphy')) {
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
      else if (botResponse.includes('spotify')) {
        const spotifyPlayer = document.createElement('iframe');
        spotifyPlayer.src = botResponse.slice(0, 25) + 'embed/' + botResponse.slice(25);
        spotifyPlayer.width = 300;
        spotifyPlayer.height = 380;
        spotifyPlayer.frameBorder = 0;
        spotifyPlayer.allowtransparency = 'true';
        spotifyPlayer.allow = 'encrypted-media';
        response.append(spotifyPlayer);
      }
      else if (botResponse.includes('youtu.')) {
        const youtubePlayer = document.createElement('iframe');
        youtubePlayer.src = 'https://www.youtube.com/embed/' + botResponse.slice(17);
        youtubePlayer.width = 560;
        youtubePlayer.height = 315;
        youtubePlayer.frameBorder = 0;
        youtubePlayer.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        youtubePlayer.allowFullscreen = true;
        response.append(youtubePlayer);
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
