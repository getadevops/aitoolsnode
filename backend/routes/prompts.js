// backend/routes/prompts.js
const express = require('express');
const router = express.Router();
const Prompt = require('../models/prompt');
const auth = require('../middleware/auth');

// GET all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new prompt
router.post('/', auth, async (req, res) => {
  const prompt = new Prompt({
    title: req.body.title,
    prompt: req.body.prompt,
    category: req.body.category,
    submittedBy: req.user.id
  });

  try {
    const newPrompt = await prompt.save();
    res.status(201).json(newPrompt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
