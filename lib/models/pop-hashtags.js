const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema();

schema.static('popHashtags', () => {
  const pipeline = 
      [{
        $unwind: {
          path: '$hashtags',
        }
      }, 
      {
        $group: {
          _id: '$hashtags.text',
          count: {
            $sum: 1
          }
        }
      }];
  return this.aggregate(pipeline);
});


module.exports = mongoose.model('PopHashtags', schema);