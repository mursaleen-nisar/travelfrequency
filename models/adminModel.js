const pool = require('../config/mysql-connection');

const createAdminTableQuery = `
    CREATE TABLE IF NOT EXISTS admin (
        id INT PRIMARY KEY DEFAULT 1,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
`;

const createAdminTable = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(createAdminTableQuery);
        connection.release();
        console.log('Admin table created successfully');
    } catch(err) {
        console.error('Error creating admin table:', err);
    }
}


module.exports = {
    createAdminTable
};