// backend/models/vote.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tool: { type: Schema.Types.ObjectId, ref: 'Tool', required: true },
  vote: { type: Number, enum: [1, -1], required: true }, // 1 for upvote, -1 for downvote
  createdAt: { type: Date, default: Date.now },
});

// Ensure a user can only vote once per tool
voteSchema.index({ user: 1, tool: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
