import jwt from 'jsonwebtoken';
import pool from '../config/mysql-connection.js';

export default async (req, res, next) => {
    if(!req.cookies.token) {
        return res.redirect('/admin/login');
    }
    
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        
        // Connect to the database
        const connection = await pool.getConnection();
        const [ rows ] = await connection.execute('SELECT * FROM admin WHERE email = ?', [ decoded.email ]);
        connection.release();

        if(rows.length === 0) {
            return res.redirect('/admin/login');
        }
        next();

    } catch(err) {
        res.send('Something went wrong while logging in.');
    }
}