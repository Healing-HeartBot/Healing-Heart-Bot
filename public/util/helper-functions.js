export function getResponse(mood) {
  const url = `http://localhost:3000/api/responses/heartbot?moods=${mood}`;
  return fetch(url)
    .then(response => response.json());
}