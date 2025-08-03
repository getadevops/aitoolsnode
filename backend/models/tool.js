// backend/models/tool.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

toolSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Tool', toolSchema);
