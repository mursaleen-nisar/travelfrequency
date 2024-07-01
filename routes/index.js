import express from 'express';
const router = express.Router();
import pool from '../config/mysql-connection.js';
import { addQuoteRequest } from '../models/getQuoteModel.js';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


// Function to get all testimonials from the database
const getAllTestimonials = async () => {
    const query = `
        SELECT client_name, client_testimonial, client_image FROM testimonials;
    `;
    try {
        const connection = await pool.getConnection();
        const [ rows ] = await connection.query(query);
        connection.release();
        return rows;
    } catch (err) {
        throw new Error(`Error getting testimonials: ${err.message}`);
    }
};

router.get('/', async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    try {
        const testimonials = await getAllTestimonials();
        res.render('index', { title: 'Home', page: 'index', testimonials, today });
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.render('index', { testimonials: [] });
    }
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About', page: 'about' });
});

router.get('/contact', (req, res) => {
    res.render('contact-us', { title: 'Contact', page: 'contact' });
});

router.get('/quote-submitted', (req, res) => {
    res.render('thank-you', { title: 'Quote Submitted', page: 'quote-submitted' });
});

router.post('/get-quote', async (req, res) => {
    let { full_name, phone_number, email, journey_date } = req.body;

    try {
        await addQuoteRequest(full_name, phone_number, email, journey_date);
        res.redirect('/quote-submitted');
    } catch (err) {
        res.send('Error occurred while adding quote: ' + err.message);
    }
    // Send mail using nodemailer
    async function nodeMailer() {
        const info = await transporter.sendMail({
          from: "<mursaleennisar980@gmail.com>",
          to: "travelfrequencytourandtravels@gmail.com", // list of receivers
          subject: "New Quote Request On Website",
          text: `Name: ${full_name}\nPhone: ${phone_number}\nEmail: ${email || 'N/A'}\nJourney Date: ${journey_date || 'N/A'}`,
        });
      
        console.log("Message sent: %s", info.messageId);
    }
    nodeMailer().catch(console.error);
});


export default router;