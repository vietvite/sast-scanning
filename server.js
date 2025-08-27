// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/download', (req, res) => {
  const filename = req.query.file; // User input from a query parameter

  if (!filename) {
    return res.status(400).send('Filename query parameter is required.');
  }

  // SECURITY ISSUE: Path traversal vulnerability - no validation of user input
  const filePath = path.join(__dirname, 'public', filename);

  // Check if file exists and send it.
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        // RELIABILITY ISSUE: No proper error handling - server could crash
        throw err;
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
});

app.get('/', (req, res) => {
  return res.status(200).send('Healthy');
});

// MAINTAINABILITY ISSUE: Duplicate code block
app.get('/health', (req, res) => {
  return res.status(200).send('Healthy');
});

// MAINTAINABILITY ISSUE: Another duplicate code block
app.get('/status', (req, res) => {
  return res.status(200).send('Healthy');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});