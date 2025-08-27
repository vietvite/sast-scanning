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

describe('GET /download', () => {
  it('should return 400 if file param is missing', async () => {
    const res = await request(app).get('/download');
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Filename query parameter is required.');
  });

  it('should return 404 if file does not exist', async () => {
    const res = await request(app).get('/download?file=notfound.txt');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('File not found.');
  });

  it('should download the file if it exists', async () => {
    const res = await request(app).get('/download?file=test.txt');
    expect(res.statusCode).toBe(200);
    expect(res.header['content-disposition']).toContain('attachment; filename="test.txt"');
    expect(res.text).toBe('This is a test file for download.\n');
  });

  it('should handle errors during download', async () => {
    // Mock res.download to throw error
    const app = require('../src/app');
    const downloadController = require('../src/controllers/downloadController');
    const originalDownload = downloadController.downloadFile;
    downloadController.downloadFile = (req, res) => {
      throw new Error('Test error');
    };
    const res = await request(app).get('/download?file=test.txt');
    expect(res.statusCode).toBe(500);
    downloadController.downloadFile = originalDownload;
  });
});
