
const mysql = require('mysql2/promise'); 
require('dotenv').config(); 


const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',      
  user: process.env.DB_USER || 'root',           
  password: process.env.DB_PASSWORD || '123456789', 
  database: process.env.DB_NAME || 'greendrop_db',  
  port: process.env.DB_PORT || 3306,             
  waitForConnections: true,                       
  connectionLimit: 10,                            
  queueLimit: 0                                   
});

module.exports = pool; 