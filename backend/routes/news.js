// backend/routes/news.js
const express = require('express');
const router = express.Router();
const News = require('../models/news');

// GET all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new news article
router.post('/', async (req, res) => {
  const news = new News({
    title: req.body.title,
    source: req.body.source,
    date: req.body.date,
    link: req.body.link,
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
