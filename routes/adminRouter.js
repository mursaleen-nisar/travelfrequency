import express from 'express';
const router = express.Router();
import { comparePassword } from '../middlewares/comparePassword.js';
import { postRegister, postLogin } from '../controllers/authController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import jwt from 'jsonwebtoken';
import pool from '../config/mysql-connection.js';
import { addTestimonial } from '../models/testimonialModel.js';
import upload from '../middlewares/multerUpload.js';


if(process.env.NODE_ENV === 'development') {
    router.get('/register', (req, res) => {
        res.render('admin-register', { title: 'Admin Register', page: 'admin-register' });
    });

    router.post('/register', comparePassword, postRegister);
}


router.get('/login', async (req, res) => {
    // Check token
    if (req.cookies.token) {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        // Connect to the database
        const connection = await pool.getConnection();

        // Fetch the admin by email
        const [ rows ] = await connection.execute('SELECT * FROM admin WHERE email = ?', [decoded.email]);

        if (rows.length === 1) {
            return res.redirect('/admin/dashboard');
        } else {
            res.clearCookie('token');
        }
    }
    res.render('admin-login', { title: 'Admin Login', page: 'admin-login' });
});

router.post('/login', postLogin);

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('admin-dashboard', { title: 'Admin Dashboard', page: 'admin-dashboard' });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/login');
});

router.post('/add-testimonial', upload.single('client_image'), async (req, res) => {
    const { client_name, client_testimonial } = req.body;
    let client_image = req.file ? req.file.buffer : null;

    try {
        await addTestimonial(client_name, client_testimonial, client_image);
        res.send('Testimonial added successfully');
    } catch (err) {
        res.send('Error adding testimonial: ' + err.message);
    }
});

export default router;