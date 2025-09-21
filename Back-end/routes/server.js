
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json()); 


const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const profileRoutes = require('./routes/profile');
const redeemRoutes = require('./routes/redeem');


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/redeem', redeemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});