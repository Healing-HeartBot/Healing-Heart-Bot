// no need to export this. This is only used by this file
const DEFAULT_MOODS = {
  mad: ['shock', 'shook', 'shocked', 'crazy', 'angry', 'anger', 'pissed', 'agitated', 'psychotic', 'furious', 'livid', 'fuming', 'infuriated', 'upset', 'raging', 'rageful', 'enraged', 'irate', 'indignant', 'irritated', 'annoyed', 'psycho', 'absurd', 'distraught', 'frantic', 'frenzied', 'berserk', 'raging', 'frenetic', 'resentful', 'incensed', 'wrathful', 'seeing red', 'provoked'],
  sad: ['bummed', 'depressed', 'heartbroken', 'melancholy', 'somber', 'blue', 'pensive', 'down', 'gloomy', 'low', 'crying', 'weepy', 'dejected', 'negative', 'hurt', 'awful', 'terrible', 'worst', 'unhappy', 'devastated', 'distraught', 'dismal', 'sorrowful', 'pessimistic', 'mournful', 'despondent', 'forlorn'],
  weak: ['lame', 'desperate', 'longing', 'drunk', 'hopeless', 'insecure', 'fragile', 'delicate', 'miserable', 'overcome', 'despair', 'despairing'],
  hopeful: ['peace', 'acceptance', 'forgive', 'forgiveness', 'happy', 'optimistic', 'cheerful', 'confident', 'ready', 'upbeat', 'reassured', 'better', 'positive', 'promising', 'calm', 'fine', 'good', 'okay', 'relieved', 'excited', 'excite', 'exciting'],
  bitter: ['resentful', 'spiteful', 'catty', 'hateful', 'betrayed', 'vindictive', 'disgruntled', 'bothered', 'grudge', 'peeved', 'rant', 'vent'],
  lonely: ['alone', 'abandoned', 'isolated', 'empty', 'lonesome', 'deserted', 'desolate', 'left', 'single', 'rejected', 'jilted', 'friendless', 'unloved', 'forsaken', 'unpopular', 'downcast']
};

function moodMapper(hashtags, moods = DEFAULT_MOODS) {
  const resultArray = [];
  return [...Object.entries(moods)
    .reduce((acc, [mood, synonyms]) => {
      if (hashtags.includes(mood) || hashtags.some(tag => synonyms.includes(tag))) {
        acc.add(mood);
      }
      return acc
    }, new Set())];
}

module.exports = {
  moodMapper
};
