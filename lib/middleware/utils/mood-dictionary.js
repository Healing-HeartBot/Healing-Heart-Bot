const moods = {
  mad: ['crazy', 'angry', 'anger', 'pissed', 'agitated', 'psychotic', 'furious', 'livid', 'fuming', 'infuriated', 'upset', 'raging', 'rageful', 'enraged', 'irate', 'indignant', 'irritated', 'annoyed', 'psycho', 'absurd', 'distraught', 'frantic', 'frenzied', 'berserk', 'raging', 'frenetic', 'resentful', 'incensed', 'wrathful', 'seeing red', 'provoked'],
  sad: ['bummed', 'depressed', 'heartbroken', 'melancholy', 'somber', 'blue', 'pensive', 'down', 'gloomy', 'low', 'crying', 'weepy', 'dejected', 'negative', 'hurt', 'awful', 'terrible', 'worst', 'unhappy', 'devastated', 'distraught', 'dismal', 'sorrowful', 'pessimistic', 'mournful', 'despondent', 'forlorn'],
  weak: ['lame', 'desperate', 'longing', 'drunk', 'hopeless', 'insecure', 'fragile', 'delicate', 'miserable', 'overcome', 'despair', 'despairing'],
  hopeful: ['happy', 'optimistic', 'cheerful', 'confident', 'ready', 'upbeat', 'reassured', 'better', 'positive', 'promising', 'calm', 'fine', 'good', 'okay', 'relieved', 'excited', 'excite', 'exciting'],
  bitter: ['resentful', 'spiteful', 'catty', 'hateful', 'betrayed', 'vindictive', 'disgruntled', 'bothered', 'grudge', 'peeved', 'rant', 'vent'],
  lonely: ['alone', 'abandoned', 'isolated', 'empty', 'lonesome', 'deserted', 'desolate', 'left', 'single', 'rejected', 'jilted', 'friendless', 'unloved', 'forsaken', 'unpopular', 'downcast']
};

function moodMapper(moods, mood) {
  const resultArray = [];
  const object = Object.entries(moods);
  for(let i = 0; i < object.length; i++) {
    if(object[i][0].includes(mood[0]) || object[i][1].includes(mood[0])) {
      resultArray.push(object[i][0]);
    }
    if(mood[1]) {
      if(object[i].includes(mood[1]) || object[i][1].includes(mood[1])) {
        resultArray.push(object[i][0]);
      }
    }
  }
  if(resultArray.length > 0) return resultArray;
  else {
    resultArray.push('random');
    return resultArray;
  } 
}

module.exports = {
  moods, 
  moodMapper
};