const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/guest', (req, res) => {
  // payload may contain tableId + restaurantId
  const { tableId, restaurantId } = req.body;
  const payload = { role: 'guest', tableId, restaurantId };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '6h' });
  res.json({ success: true, token, expiresIn: process.env.JWT_EXPIRES_IN || '6h' });
});

module.exports = router;
