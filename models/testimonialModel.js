const pool = require('../config/mysql-connection');
const fs = require('fs');
const path = require('path');

// Load default image
const defaultImagePath = path.join(__dirname, '..', 'public', 'images', 'default-profile.png');
const defaultImage = fs.readFileSync(defaultImagePath);

// Function to create the testimonials table if it doesn't exist
const createTestimonialsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS testimonials (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_name VARCHAR(255) NOT NULL,
            client_testimonial TEXT NOT NULL,
            client_image LONGBLOB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        const connection = await pool.getConnection();
        await connection.query(query);
        connection.release();
        console.log('Testimonials table created successfully');
    } catch(err) {
        throw new Error(`Error creating testimonials table: ${err.message}`);
    }
};

// Function to insert a new testimonial
const addTestimonial = async (client_name, client_testimonial, client_image) => {
    const query = `
        INSERT INTO testimonials (client_name, client_testimonial, client_image)
        VALUES (?, ?, ?);
    `;
    try {
        const connection = await pool.getConnection();
        const result = await connection.query(query, [ client_name, client_testimonial, client_image || defaultImage ]);
        connection.release();
        return result;
    } catch (err) {
        throw new Error(`Error adding testimonial: ${err.message}`);
    }
};

module.exports = {
    addTestimonial,
    createTestimonialsTable
};