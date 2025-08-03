// backend/routes/tools.js
const express = require('express');
const router = express.Router();

const defaultTools = [
  {
    _id: "1",
    name: "Visual Studio Code",
    description: "A source-code editor made by Microsoft for Windows, Linux and macOS.",
    tags: ["editor", "developer"],
    upvotes: 10,
    downvotes: 1,
    status: "approved",
    createdAt: new Date()
  },
  {
    _id: "2",
    name: "Postman",
    description: "A collaboration platform for API development.",
    tags: ["api", "developer"],
    upvotes: 5,
    downvotes: 0,
    status: "approved",
    createdAt: new Date()
  }
];

// GET all tools
router.get('/', (req, res) => {
  res.json(defaultTools);
});

// GET a single tool
router.get('/:id', (req, res) => {
  const tool = defaultTools.find(t => t._id === req.params.id);
  if (tool) {
    res.json(tool);
  } else {
    res.status(404).json({ message: 'Cannot find tool' });
  }
});

module.exports = router;
