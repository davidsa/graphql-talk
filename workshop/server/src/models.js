const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  race: String,
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
