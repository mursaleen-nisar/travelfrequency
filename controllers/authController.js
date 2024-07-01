import pool from '../config/mysql-connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const connection = await pool.getConnection();
                await connection.query('INSERT INTO admin (name, email, password) VALUES (?,?,?)', [name, email, hash]);
                connection.release();
            });
        });
        
        res.redirect('/admin/login');
    } catch(err) {
        console.error('Error registering admin:', err);
        res.redirect('/admin/register');
    }
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Connect to the database
        const connection = await pool.getConnection();

        // Fetch the admin by email
        const [rows] = await connection.execute('SELECT * FROM admin WHERE email = ?', [email]);

        // Check if the admin exists
        if (rows.length === 0) {
            return res.send('Invalid credentials');
        }

        const admin = rows[0];

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.send('Invalid credentials');
        }

        // Set a cookie with the email, expires in 7 days
        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // Secure the cookie to be accessible only by the web server
        });

        res.redirect('/admin/dashboard'); // Redirect to admin dashboard or any appropriate route

        // Release the connection
        connection.release();
    } catch (error) {
        console.error('Error during login:', error);
        res.redirect('/login');
    }
}