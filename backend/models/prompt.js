// backend/models/prompt.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new Schema({
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  category: { type: String, required: true },
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prompt', promptSchema);
