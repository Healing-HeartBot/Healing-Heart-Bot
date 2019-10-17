const messages = require('../../lib/middleware/utils/generic-messages');

describe('checking to see if pick mood works', () => {
  const pickMood = function(num) {
    const pickedMood = Math.floor(Math.random() * num);
    return pickedMood;
  };

  it('picks a mood', () => {
    const emotionArray = messages.sad;
    const index = pickMood(emotionArray.length);
    console.log(emotionArray[index]);
    expect(emotionArray[index]).toEqual(expect.any(String));
    expect(index).toBeLessThan(6);
  });
});