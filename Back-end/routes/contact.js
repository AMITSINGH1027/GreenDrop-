const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/submit', async (req, res) => {
  console.log('Contact submission:', req.body.name);
  const { reason, name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_submissions (reason, name, email, message) VALUES (?, ?, ?, ?)',
      [reason || 'General', name, email, message]
    );

    console.log('Contact submitted:', name);
    res.json({ message: 'Thank you! Your message has been sent.' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ message: 'Server error submitting contact form.' });
  }
});

module.exports = router;