const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    Title: {
      type :String,
      required: true
    },
    Release : Date,
    Genre : String,
    Cover_url : String,
    Tracks: [{type : mongoose.Schema.Types.ObjectId, ref:'Tracks'}]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Album', albumSchema);