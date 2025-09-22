const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  console.log('Profile request for user ID:', req.user.id);
  const userId = req.user.id;

  try {
    const [users] = await pool.query(
      'SELECT id, first_name, last_name, email, phone_number, username, points, bottles_returned, badges, role FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log('Profile loaded for:', users[0].username);
    res.json(users[0]);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error fetching profile.' });
  }
});

module.exports = router;