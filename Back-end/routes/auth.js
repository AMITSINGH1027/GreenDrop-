const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  console.log('Register attempt:', req.body.username);
  const { first_name, last_name, phone_number, username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    // Check if user exists
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, phone_number, username, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name || '', last_name || '', phone_number || '', username, email, hashedPassword]
    );

    console.log('User registered:', result.insertId);
    res.status(201).json({ message: 'User registered successfully. Please login.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body.username);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('User logged in:', user.username);
    res.json({
      message: 'Login successful',
      token,  // This is your JWT token!
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        points: user.points,
        bottles_returned: user.bottles_returned,
        badges: user.badges || []
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;