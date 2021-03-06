const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  markdownContent: {
    type: String,
    required: true
  },
  writeType: [{
    type: Schema.Types.ObjectId,
    ref: 'writeType'
  }],
  creatorId: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = Article = mongoose.model('article', ArticleSchema);
