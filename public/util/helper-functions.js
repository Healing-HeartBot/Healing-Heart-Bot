export function getResponse(mood) {
  const url = `/api/responses/heartbot?moods=${mood}`;
  return fetch(url)
    .then(response => response.json());
}

export function getGiphy(id) {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.GIPHY_API_KEY}`;
  return fetch(url)
    .then(gif => gif.json());
}