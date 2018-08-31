const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const ScoreSchema = new mongoose.Schema({
  username: String,
  date: {
    type: Date,
    default: Date.now
  },
  score: Number
})

ScoreSchema.plugin(findOrCreate)

module.exports = mongoose.model('mindsweeper-score', ScoreSchema);
