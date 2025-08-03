// backend/models/news.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);
