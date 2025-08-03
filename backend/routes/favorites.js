// backend/routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');
const auth = require('../middleware/auth');

// GET all favorites for a user
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('item');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new favorite
router.post('/', auth, async (req, res) => {
  const { item, itemType } = req.body;
  const favorite = new Favorite({
    user: req.user.id,
    item,
    itemType,
  });

  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a favorite
router.delete('/:id', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ _id: req.params.id, user: req.user.id });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.deleteOne();
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
