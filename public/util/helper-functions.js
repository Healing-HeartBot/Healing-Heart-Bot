export function getResponse(mood) {
  const url = `/api/responses/heartbot?moods=${mood}`;
  return fetch(url)
    .then(response => response.json());
}

export function getGiphy(id) {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=LU5Wk8NpjGM85mYPMBq45HtJ7Dd9oGbI`;
  return fetch(url)
    .then(gif => gif.json());
}