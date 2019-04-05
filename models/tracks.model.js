const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
    Title: {
      type :String,
      required: true
    },
    Duration : Number,
    Listenings : Number,
    Likes : Number,
    Featuring : [{type : mongoose.Schema.Types.ObjectId, ref: 'Artist'}]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Track', trackSchema);