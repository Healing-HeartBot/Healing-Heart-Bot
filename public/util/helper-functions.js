export function getResponse(mood) {
  const url = `/api/responses/heartbot?moods=${mood}`;
  return fetch(url)
    .then(response => response.json());
}

export function getGiphy(id) {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=99S9Gx3qn8JOOzyDfocCFu6Mk9Y9bniZ`;
  return fetch(url)
    .then(gif => gif.json());
}