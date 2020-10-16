const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    requred: true,
  },
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer',
    },
  },
});

module.exports = mongoose.model('Movie', movieSchema);
