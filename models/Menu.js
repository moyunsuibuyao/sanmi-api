const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MenuSchema = new Schema({
  isAdmin: {
    type: String,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  },
  level: {
    type: Number,
    default: 1
  },
  path: {
    type: String,
  },
  parentId: {
    type: String,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Menu = mongoose.model('menus', MenuSchema);
