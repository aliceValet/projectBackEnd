const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: String,
    Birthday : Date,
    Followers : Number,
    Albums: [mongoose.Schema.Types.ObjectId]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Artist', artistSchema);