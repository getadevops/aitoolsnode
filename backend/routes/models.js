// backend/routes/models.js
const express = require('express');
const router = express.Router();
const Model = require('../models/model');

// GET all models
router.get('/', async (req, res) => {
  try {
    const models = await Model.find().sort({ createdAt: -1 });
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new model
router.post('/', async (req, res) => {
  const model = new Model({
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
  });

  try {
    const newModel = await model.save();
    res.status(201).json(newModel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
