const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  remark: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = Work = mongoose.model('works', WorkSchema);
