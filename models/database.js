const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: 'root', 
  database: 'restaurant_system', 
});

connection.getConnection(function (err) {
  if (err) {
    console.error('Database connection error:', err);
    throw err; 
  } else {
    console.log('Connected to the database');
  }
});


module.exports = connection;
