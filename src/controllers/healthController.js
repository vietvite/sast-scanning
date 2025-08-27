// src/controllers/healthController.js
exports.health = (req, res) => {
  return res.status(200).send('Healthy');
};
