import mysql from 'mysql2';

import createDebug from 'debug';
const debug = createDebug("development:mysql");

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true, // Whether the pool should wait for connections to become available if connectionLimit is reached
    connectionLimit: 10, // Number of connections to create at once
    queueLimit: 0 // Maximum number of connection requests the pool should queue
});

pool.getConnection((err, connection) => {
    if (err) {
        debug("Error connecting to MySQL:", err.message);
    } else {
        debug("Connected to MySQL");
        connection.release(); // Release the connection back to the pool after testing
    }
});

export default pool.promise();