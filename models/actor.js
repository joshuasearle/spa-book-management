const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  bYear: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Birth year must be an integer.',
    },
  },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

module.exports = mongoose.model('Actor', actorSchema);
