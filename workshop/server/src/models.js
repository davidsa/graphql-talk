const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
