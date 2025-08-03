// backend/__tests__/tools.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const toolsRouter = require('../routes/tools');

const app = express();
app.use(express.json());
app.use('/api/tools', toolsRouter);

beforeAll(async () => {
  const dbURI = 'mongodb://localhost:27017/ai-toolify-test';
  await mongoose.connect(dbURI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Tools API', () => {
  it('should get all tools', async () => {
    const res = await request(app).get('/api/tools');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
