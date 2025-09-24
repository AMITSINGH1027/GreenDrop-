const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || ',
  user: process.env.DB_USER || 
  password: process.env.DB_PASSWORD || '
  database: process.env.DB_NAME || 'greendrop_db',
  port: process.env.DB_PORT || 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on startup
pool.getConnection().then(() => {
  console.log('✅ MySQL connected successfully');
}).catch(err => {
  console.error('❌ MySQL connection failed:', err);
});

module.exports = pool;
