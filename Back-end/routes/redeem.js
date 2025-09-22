const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get rewards
router.get('/', async (req, res) => {
  try {
    const [rewards] = await pool.query('SELECT * FROM rewards WHERE stock > 0 ORDER BY points_cost ASC');
    res.json(rewards);
  } catch (err) {
    console.error('Rewards error:', err);
    res.status(500).json({ message: 'Server error fetching rewards.' });
  }
});

// Redeem reward
router.post('/:rewardId/redeem', authenticateToken, async (req, res) => {
  console.log('Redemption attempt for reward ID:', req.params.rewardId, 'by user ID:', req.user.id);
  const userId = req.user.id;
  const rewardId = parseInt(req.params.rewardId);

  try {
    // Get user points
    const [users] = await pool.query('SELECT points FROM users WHERE id = ?', [userId]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });
    const userPoints = users[0].points;

    // Get reward
    const [rewards] = await pool.query('SELECT points_cost, stock, name FROM rewards WHERE id = ?', [rewardId]);
    if (rewards.length === 0) return res.status(404).json({ message: 'Reward not found.' });
    const reward = rewards[0];

    // Validate
    if (reward.stock <= 0) return res.status(400).json({ message: 'Reward out of stock.' });
    if (userPoints < reward.points_cost) return res.status(400).json({ message: 'Not enough points.' });

    // Update database
    await pool.query('UPDATE users SET points = points - ? WHERE id = ?', [reward.points_cost, userId]);
    await pool.query('UPDATE rewards SET stock = stock - 1 WHERE id = ?', [rewardId]);
    await pool.query('INSERT INTO user_rewards (user_id, reward_id) VALUES (?, ?)', [userId, rewardId]);

    console.log('Reward redeemed:', reward.name, 'by user ID:', userId);
    res.json({ message: `Congratulations! You redeemed ${reward.name} for ${reward.points_cost} points.` });
  } catch (err) {
    console.error('Redemption error:', err);
    res.status(500).json({ message: 'Server error during redemption.' });
  }
});

module.exports = router;