// backend/routes/search.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Tool = require('../models/tool');
const Job = require('../models/job');
const News = require('../models/news');
const Prompt = require('../models/prompt');
const Model = require('../models/model');

// TODO: Move API key to environment variables
const openai = new OpenAI({ apiKey: 'your_openai_api_key' });

router.post('/', async (req, res) => {
  const { query, conversationHistory } = req.body;

  try {
    // Step 1: Use OpenAI to understand the query
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful search assistant for a website that lists AI tools, jobs, news, and prompts. Your task is to analyze the user query and identify the resource type (tool, job, news, prompt, model) and the key search terms. Respond with a JSON object containing "resourceType" and "searchTerms".' },
        ...conversationHistory,
        { role: 'user', content: query },
      ],
    });

    const assistantResponse = completion.choices[0].message.content;
    const { resourceType, searchTerms } = JSON.parse(assistantResponse);

    // Step 2: Query the database based on the response
    let results = [];
    if (resourceType === 'tool') {
      results = await Tool.find({ $text: { $search: searchTerms } });
    } else if (resourceType === 'job') {
      results = await Job.find({ $text: { $search: searchTerms } });
    } // ... and so on for other resource types

    // Step 3: Generate a conversational response
    const conversationalResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            ...conversationHistory,
            { role: 'user', content: query },
            { role: 'assistant', content: `I found some ${resourceType}s related to "${searchTerms}".` },
        ],
    });

    res.json({
      results,
      conversationalResponse: conversationalResponse.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
