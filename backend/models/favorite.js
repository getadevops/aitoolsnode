// backend/models/favorite.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: Schema.Types.ObjectId, required: true, refPath: 'itemType' },
  itemType: { type: String, required: true, enum: ['Tool', 'Job'] }, // Add other types as needed
  createdAt: { type: Date, default: Date.now },
});

// Ensure a user can only favorite an item once
favoriteSchema.index({ user: 1, item: 1, itemType: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
