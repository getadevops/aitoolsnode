const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Database connection
// TODO: Replace with your actual MongoDB connection string
// const dbURI = 'mongodb://localhost:27017/ai-toolify';
// mongoose.connect(dbURI)
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World from the AI Toolify backend!');
});

// API Routes
const toolsRouter = require('./routes/tools');
app.use('/api/tools', toolsRouter);

const newsRouter = require('./routes/news');
app.use('/api/news', newsRouter);

const jobsRouter = require('./routes/jobs');
app.use('/api/jobs', jobsRouter);

const modelsRouter = require('./routes/models');
app.use('/api/models', modelsRouter);

const promptsRouter = require('./routes/prompts');
app.use('/api/prompts', promptsRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const favoritesRouter = require('./routes/favorites');
app.use('/api/favorites', favoritesRouter);

const searchRouter = require('./routes/search');
app.use('/api/search', searchRouter);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
