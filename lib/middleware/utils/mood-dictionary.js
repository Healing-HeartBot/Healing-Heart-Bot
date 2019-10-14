const moods = {
  mad: ['angry', 'anger', 'pissed', 'agitated', 'psychotic', 'furious', 'livid', 'fuming', 'infuriated', 'upset', 'raging', 'rageful', 'enraged', 'livid', 'irate', 'indignant', 'irritated'],
  sad: ['depressed', 'heartbroken', 'melancholy', 'somber', 'blue', 'pensive', 'down', 'gloomy', 'low', 'crying', 'weepy', 'dejected', 'negative', 'hurt', 'awful', 'terrible', 'worst', 'unhappy', 'devastated', 'distraught'],
  weak: ['lame', 'desperate', 'longing', 'drunk', 'hopeless', 'insecure', 'fragile', 'delicate', 'miserable', 'overcome', 'despair', 'despairing'],
  hopeful: ['optimistic', 'cheerful', 'confident', 'ready', 'upbeat', 'reassured', 'better', 'positive', 'promising', 'calm', 'fine', 'good', 'okay'],
  bitter: ['resentful', 'spiteful', 'catty', 'hateful', 'betrayed', 'vindictive', 'disgruntled', 'bothered', 'grudge', 'peeved', 'rant', 'vent'],
  lonely: ['alone', 'abandoned', 'isolated', 'empty', 'lonesome', 'deserted', 'desolate', 'left', 'single', 'rejected', 'jilted', 'friendless', 'unloved', 'forsaken', 'unpopular', 'downcast']
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