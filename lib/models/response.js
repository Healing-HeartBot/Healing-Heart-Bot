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

module.exports = mongoose.model('Response', schema);