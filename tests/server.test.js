// tests/server.test.js
const request = require('supertest');
const express = require('express');


const app = require('../src/app');

describe('GET /', () => {
  it('should return Healthy', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Healthy');
  });
});

describe('GET /health', () => {
  it('should return Healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Healthy');
  });
});
