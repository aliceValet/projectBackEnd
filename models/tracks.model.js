const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
    Title: {
      type :String,
      required: true
    }
    Duration : Number,
    Listenings : Number,
    Likes : Number,
    Featuring : [mongoose.Schema.Types.ObjectId]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Track', trackSchema);