
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


router.get('/', async (req, res) => {
  try {
    const [rewards] = await pool.query('SELECT * FROM rewards WHERE stock > 0');
    res.json(rewards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/:rewardId/redeem', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const rewardId = req.params.rewardId;

  try {
    
    const [users] = await pool.query('SELECT points FROM users WHERE id = ?', [userId]);
    if (users.length === 0) return res.status(404).json({ message: 'User  not found' });
    const userPoints = users[0].points;

    
    const [rewards] = await pool.query('SELECT points_cost, stock FROM rewards WHERE id = ?', [rewardId]);
    if (rewards.length === 0) return res.status(404).json({ message: 'Reward not found' });
    const reward = rewards[0];

    if (reward.stock <= 0) return res.status(400).json({ message: 'Reward out of stock' });
    if (userPoints < reward.points_cost) return res.status(400).json({ message: 'Not enough points' });

    
    await pool.query('UPDATE users SET points = points - ? WHERE id = ?', [reward.points_cost, userId]);
    await pool.query('UPDATE rewards SET stock = stock - 1 WHERE id = ?', [rewardId]);

    
    await pool.query('INSERT INTO user_rewards (user_id, reward_id) VALUES (?, ?)', [userId, rewardId]);

    res.json({ message: 'Reward redeemed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;