const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  content: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
  },
  moods: [{
    type: String
  }]

});

schema.static('banana', function() {
  const pipeline = [{
    $sample: { size: 1 }
  }];
  return this.aggregate(pipeline);
});



module.exports = mongoose.model('Response', schema);