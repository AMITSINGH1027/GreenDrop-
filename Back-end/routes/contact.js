
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/submit', async (req, res) => {
  const { reason, name, email, message } = req.body;
  try {
    await pool.query(
      'INSERT INTO contact_submissions (reason, name, email, message) VALUES (?, ?, ?, ?)',
      [reason, name, email, message]
    );
    res.json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;