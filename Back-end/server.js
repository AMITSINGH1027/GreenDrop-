// server.js (Debug Version)
console.log('🚀 Starting server.js...');

const express = require('express');
console.log('✅ Express imported.');

const cors = require('cors');
console.log('✅ CORS imported.');

require('dotenv').config();
console.log('✅ Dotenv loaded.');

console.log('📦 Creating Express app...');
const app = express();

console.log('🔧 Adding middleware...');
app.use(cors({ origin: '*' })); // Allow all origins for development
console.log('✅ CORS middleware added.');

app.use(express.json()); // Parse JSON requests
console.log('✅ JSON middleware added.');

console.log('📂 Importing routes...');
try {
  const authRoutes = require('./routes/auth');
  console.log('✅ Auth routes imported.');
  
  const contactRoutes = require('./routes/contact');
  console.log('✅ Contact routes imported.');
  
  const profileRoutes = require('./routes/profile');
  console.log('✅ Profile routes imported.');
  
  const redeemRoutes = require('./routes/redeem');
  console.log('✅ Redeem routes imported.');
} catch (importErr) {
  console.error('❌ Route import error:', importErr.message);
  process.exit(1); // Stop if routes fail
}

console.log('🛤️ Setting up routes...');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/redeem', require('./routes/redeem'));

console.log('🧪 Adding test endpoint...');
app.get('/api/test', async (req, res) => {
  const pool = require('./config/db');
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as userCount FROM users');
    res.json({ message: 'Backend working!', users: rows[0].userCount });
  } catch (err) {
    console.error('Test endpoint error:', err);
    res.status(500).json({ message: 'DB test failed' });
  }
});

console.log('🌐 Starting server on port...');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('🎉 Full startup complete! Test at http://localhost:5000/api/test');
});
console.log('📝 Debug: If you see this, app.listen was reached but callback might not fire.');