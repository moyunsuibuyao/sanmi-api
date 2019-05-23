const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WriteTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = WriteType = mongoose.model('writeType', WriteTypeSchema);
