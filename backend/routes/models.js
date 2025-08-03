// backend/routes/models.js
const express = require('express');
const router = express.Router();

const defaultModels = [
  {
    _id: "1",
    name: "GPT-4",
    description: "A large-scale, multimodal model that can accept image and text inputs and produce text outputs.",
    link: "https://openai.com/research/gpt-4",
    createdAt: new Date()
  },
  {
    _id: "2",
    name: "Claude 3",
    description: "A family of large language models developed by Anthropic.",
    link: "https://www.anthropic.com/news/claude-3-family",
    createdAt: new Date()
  }
];

// GET all models
router.get('/', async (req, res) => {
  res.json(defaultModels);
});

// POST a new model
router.post('/', async (req, res) => {
  const newModel = {
    _id: (defaultModels.length + 1).toString(),
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
    createdAt: new Date()
  };
  defaultModels.push(newModel);
  res.status(201).json(newModel);
});

module.exports = router;
