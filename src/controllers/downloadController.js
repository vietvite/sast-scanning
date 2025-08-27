// src/controllers/downloadController.js
const path = require('path');
const fs = require('fs');

exports.downloadFile = (req, res) => {
  const filename = req.query.file;
  if (!filename) {
    return res.status(400).send('Filename query parameter is required.');
  }
  const filePath = path.join(__dirname, '../../public', filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        throw err;
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
};
