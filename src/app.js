// src/app.js
const express = require('express');
const downloadController = require('./controllers/downloadController');
const healthController = require('./controllers/healthController');

const app = express();

app.get('/download', downloadController.downloadFile);
app.get('/', healthController.health);
app.get('/health', healthController.health);

module.exports = app;
