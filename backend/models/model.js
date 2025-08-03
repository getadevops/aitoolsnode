// backend/models/model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Model', modelSchema);
