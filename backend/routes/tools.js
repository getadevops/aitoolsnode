// backend/routes/tools.js
const express = require('express');
const router = express.Router();
const Tool = require('../models/tool');
const auth = require('../middleware/auth');
const Vote = require('../models/vote');

// GET all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single tool
router.get('/:id', getTool, (req, res) => {
  res.json(res.tool);
});

// POST a new tool
router.post('/', auth, async (req, res) => {
  const tool = new Tool({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    submittedBy: req.user.id
  });

  try {
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get a tool by ID
async function getTool(req, res, next) {
  let tool;
  try {
    tool = await Tool.findById(req.params.id);
    if (tool == null) {
      return res.status(404).json({ message: 'Cannot find tool' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tool = tool;
  next();
}

// Upvote a tool
router.post('/:id/upvote', [auth, getTool], async (req, res) => {
  try {
    const existingVote = await Vote.findOne({ user: req.user.id, tool: res.tool._id });

    if (existingVote) {
      // User has already voted
      if (existingVote.vote === 1) {
        return res.status(400).json({ message: 'You have already upvoted this tool' });
      } else {
        // Change downvote to upvote
        existingVote.vote = 1;
        await existingVote.save();
        res.tool.upvotes += 1;
        res.tool.downvotes -= 1;
        await res.tool.save();
        return res.json(res.tool);
      }
    }

    // New vote
    const vote = new Vote({ user: req.user.id, tool: res.tool._id, vote: 1 });
    await vote.save();
    res.tool.upvotes += 1;
    await res.tool.save();
    res.json(res.tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Downvote a tool
router.post('/:id/downvote', [auth, getTool], async (req, res) => {
  try {
    const existingVote = await Vote.findOne({ user: req.user.id, tool: res.tool._id });

    if (existingVote) {
      // User has already voted
      if (existingVote.vote === -1) {
        return res.status(400).json({ message: 'You have already downvoted this tool' });
      } else {
        // Change upvote to downvote
        existingVote.vote = -1;
        await existingVote.save();
        res.tool.downvotes += 1;
        res.tool.upvotes -= 1;
        await res.tool.save();
        return res.json(res.tool);
      }
    }

    // New vote
    const vote = new Vote({ user: req.user.id, tool: res.tool._id, vote: -1 });
    await vote.save();
    res.tool.downvotes += 1;
    await res.tool.save();
    res.json(res.tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH a tool (for updating status or other fields)
router.patch('/:id', [auth, getTool], async (req, res) => {
  // TODO: Add admin check
  if (req.body.name != null) {
    res.tool.name = req.body.name;
  }
  if (req.body.description != null) {
    res.tool.description = req.body.description;
  }
  if (req.body.tags != null) {
    res.tool.tags = req.body.tags;
  }
  if (req.body.status != null) {
    res.tool.status = req.body.status;
  }

  try {
    const updatedTool = await res.tool.save();
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a tool
router.delete('/:id', [auth, getTool], async (req, res) => {
  // TODO: Add admin check
  try {
    await res.tool.deleteOne();
    res.json({ message: 'Deleted Tool' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET alternative tools
router.get('/:id/alternatives', getTool, async (req, res) => {
  try {
    const originalTool = res.tool;
    const alternatives = await Tool.find({
      tags: { $in: originalTool.tags },
      _id: { $ne: originalTool._id }, // Exclude the original tool
    }).limit(5); // Limit to 5 alternatives
    res.json(alternatives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
