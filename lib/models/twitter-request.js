const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  twitId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  hashtags: [{
    type: Object,
  }],
  time: {
    type: Date,
    required: true,
  },
  tweet: {
    type: String,
    required: true,
  }
});

schema.static('popHashtags', function() {
  const pipeline = 
  [{
    $unwind: {
      path: '$hashtags',
    }
  }, {
    $group: {
      _id: '$hashtags.text',
      count: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      count: -1
    }
  }];
  return this.aggregate(pipeline);
});

schema.static('moodByTime', function() {
  const pipeline = 
  [{
    $unwind: {
      path: '$hashtags',

    }
  }, {
    $project: {
      date: {
        $dateToString: {
          format: '%H:%M:%S',
          date: '$time',
          timezone: '-07:00'
        }
      },
      mood: '$hashtags.text'
    }
  }, {
    $sort: {
      date: 1
    }
  }];
  return this.aggregate(pipeline);
});

schema.static('userByTime', function(twitterId) {
  const pipeline = 
  [{
    $match: {
      twitId: twitterId
    }
  }, {
    $unwind: {
      path: '$hashtags',
    }
  }, {
    $project: {
      date: {
        $dateToString: {
          format: '%Y-%m-%d %H:%M:%S',
          date: '$time',
          timezone: '-07:00'
        }
      },
      mood: '$hashtags.text',
      id: '$twitId',
      tweet: '$tweet'
    }
  }, {
    $sort: {
      date: 1
    }
  }];
  return this.aggregate(pipeline);
});

module.exports = mongoose.model('TwitterReq', schema);