// backend/routes/news.js
const express = require('express');
const router = express.Router();

const defaultNews = [
  {
    _id: "1",
    title: "AI discovers new antibiotic",
    source: "BBC News",
    date: new Date(),
    link: "https://www.bbc.com/news/health-64655216",
    createdAt: new Date()
  },
  {
    _id: "2",
    title: "The rise of generative AI",
    source: "TechCrunch",
    date: new Date(),
    link: "https://techcrunch.com/2023/03/29/the-rise-of-generative-ai/",
    createdAt: new Date()
  }
];

// GET all news
router.get('/', (req, res) => {
  res.json(defaultNews);
});

module.exports = router;
