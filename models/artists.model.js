const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true
    },
    Birthday : Date,
    Followers : Number,
    Albums: [mongoose.Schema.Types.ObjectId]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Artist', artistSchema);