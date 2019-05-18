const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalSchema = new Schema({
  name: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  school: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  subject: {
    type: String
  },
  startSchoolDate: {
    type: Date
  },
  graduateDate: {
    type: Date
  },
  major: {
    type: String
  },
  faculty: {
    type: String
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})
module.exports = Personal = mongoose.model('personal', PersonalSchema);
