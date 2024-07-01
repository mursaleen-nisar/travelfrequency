const pool = require('../config/mysql-connection');

// Function to create the getQuote table if it doesn't exist
const createQuoteTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS getQuote (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            email VARCHAR(255) DEFAULT NULL,
            journey_date DATE DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        const connection = await pool.getConnection();
        await connection.query(query);
        connection.release();
        console.log('GetQuote table created successfully');
    } catch (err) {
        throw new Error(`Error creating getQuote table: ${err.message}`);
    }
};

// Function to insert a new quote request
const addQuoteRequest = async (full_name, phone_number, email, journey_date) => {
    
    const query = `
    INSERT INTO getQuote (full_name, phone_number, email, journey_date)
    VALUES (?, ?, ?, ?);
    `;
    try {
        const connection = await pool.getConnection();
        const result = await connection.query(query, [full_name, phone_number, email || null, journey_date || null]);
        return result;
    } catch (err) {
        throw new Error(`Error adding quote request: ${err.message}`);
    }
};

module.exports = {
    addQuoteRequest,
    createQuoteTable
};