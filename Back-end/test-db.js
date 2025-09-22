const pool = require('./config/db');  // Import the MySQL connection pool

async function testConnection() {
  try {
    
    const [rows] = await pool.query('SELECT NOW() AS server_time');
    
    
    console.log('✅ Database query successful!');
    console.log('Current MySQL server time:', rows[0].server_time);
    
    
    const [userRows] = await pool.query('SELECT COUNT(*) AS user_count FROM users');
    console.log('Number of users in database:', userRows[0].user_count);
    
    
    const [rewardRows] = await pool.query('SELECT COUNT(*) AS reward_count FROM rewards');
    console.log('Number of rewards in database:', rewardRows[0].reward_count);
    
    console.log('🎉 All tests passed! Database is fully connected and tables are accessible.');
    
  } catch (error) {
    
    console.error('❌ Database test failed:');
    console.error('- Error message:', error.message);
    console.error('- Error code:', error.code);
    console.error('- SQL query that failed:', error.sql || 'Unknown query');
    console.error('- Full error:', error);
    
    
    if (error.code === 'ER_PARSE_ERROR') {
      console.log('💡 Fix: SQL syntax issue. Check the query in test-db.js (e.g., alias names).');
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      console.log('💡 Fix: Tables (e.g., "users") don\'t exist. Run the SQL setup script to create them.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Fix: Check username/password in .env file.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Fix: Start MySQL service and ensure port 3306 is open.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Fix: Create the database "greendrop_db" in MySQL.');
    }
  } finally {
    
    try {
      await pool.end();
    } catch (closeErr) {
      console.error('Warning: Could not close DB pool:', closeErr.message);
    }
    console.log('Test completed.');
  }
}


console.log('Starting database connection test...');
testConnection();