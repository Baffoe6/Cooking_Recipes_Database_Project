const mysql = require('mysql2/promise'); // Use mysql2 for promise-based queries

// Database configuration
const dbConfig = {
    host: 'localhost',       // Database host (e.g., localhost)
    user: 'root',            // Your MySQL username
    password: 'your_password', // Your MySQL password
    database: 'cooking_recipes_db', // Name of your database
};

// Create a connection pool
const db = mysql.createPool(dbConfig);

// Test the connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the MySQL database successfully!');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to the MySQL database:', err.message);
    }
})();

module.exports = db;