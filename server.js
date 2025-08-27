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

  // VULNERABLE LINE: User input is directly joined with a base directory.
  // An attacker could provide a filename like '../../package.json'
  // to access files outside of the '/public' directory.
  // Snyk Code will trace the 'filename' from 'req.query.file' to this file system access.
  const filePath = path.join(__dirname, 'public', filename);

  // Check if file exists and send it.
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
});

app.get('/', (req, res) => {
  return res.status(200).send('Healthy');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});