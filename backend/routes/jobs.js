// backend/routes/jobs.js
const express = require('express');
const router = express.Router();

const defaultJobs = [
  {
    _id: "1",
    title: "AI Engineer",
    company: "Google",
    location: "Mountain View, CA",
    description: "Work on the latest AI technologies.",
    createdAt: new Date()
  },
  {
    _id: "2",
    title: "Machine Learning Scientist",
    company: "Facebook",
    location: "Menlo Park, CA",
    description: "Develop new machine learning models.",
    createdAt: new Date()
  }
];

// GET all jobs
router.get('/', (req, res) => {
  res.json(defaultJobs);
});

module.exports = router;
