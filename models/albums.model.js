const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    Title: {
      type :String,
      required: true
    }
    Release : Date,
    Genre : String,
    Cover-url : String,
    Tracks: [mongoose.Schema.Types.ObjectId]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Album', albumSchema);