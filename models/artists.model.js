const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true
    },
    Birthday : Date,
    Followers : Number,
    Albums: [{type : mongoose.Schema.Types.ObjectId, ref : 'Album'}]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Artist', artistSchema);