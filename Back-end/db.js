// db.js
const mysql = require('mysql2/promise'); // Use promise version for async/await
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool with your database credentials
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',      // Your MySQL host
  user: process.env.DB_USER || 'root',           // Your MySQL username
  password: process.env.DB_PASSWORD || '123456789', // Your MySQL password
  database: process.env.DB_NAME || 'greendrop_db',  // Your database name
  port: process.env.DB_PORT || 3306,             // MySQL port (default 3306)
  waitForConnections: true,                       // Wait if no connection available
  connectionLimit: 10,                            // Max number of connections in pool
  queueLimit: 0                                   // Unlimited queueing
});

module.exports = pool; // Export the pool to use in other files