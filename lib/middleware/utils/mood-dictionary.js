const moods = {
  mad: ['angry', 'anger', 'pissed', 'agitated', 'psychotic', 'furious', 'livid', 'fuming', 'infuriated', 'upset', 'raging', 'rageful', 'enraged', 'livid'],
  sad: ['depressed', 'heartbroken', 'melancholy', 'somber', 'blue', 'pensive', 'down', 'gloomy', 'low', 'crying', 'weepy', 'dejected', 'negative', 'hurt', 'awful', 'terrible'],
  weak: ['lame', 'desperate', 'longing', 'drunk', 'hopeless', 'insecure', ''],
  hopeful: ['optimistic', 'cheerful', 'confident', 'ready', 'upbeat', 'reassured', 'better'],
  bitter: ['resentful', 'spiteful', 'catty', 'hateful', 'betrayed', 'vindictive'],
  lonely: ['alone', 'abandoned', 'isolated', 'empty', 'lonesome', 'deserted', 'desolate', 'left', 'single', 'rejected', 'jilted']
};

function moodMapper(moods, mood) {
  const object = Object.entries(moods);
  for(let i = 0; i < object.length; i++) {
    if(object[i][0].includes(mood)) {
      return object[i][0];
    }
    if(object[i][1].includes(mood)) {
      return object[i][0];
    }
  }
  return 'random';
}

module.exports = {
  moods, 
  moodMapper
};