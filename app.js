const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const adminModel = require('./models/adminModel');
const { createQuoteTable } = require('./models/getQuoteModel');
const { createTestimonialsTable } = require('./models/testimonialModel');

// Create db tables on application startup for first time
if(process.env.NODE_ENV === 'development') {
    adminModel.createAdminTable();
    createQuoteTable();
    createTestimonialsTable();
}

const indexRoute = require('./routes/index');
const cardsRoute = require('./routes/cardsRouter');
const adminRoute = require('./routes/adminRouter');
const error404NotFound = require('./middlewares/404Error');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRoute);
app.use('/cards', cardsRoute);
app.use('/admin', adminRoute);

// Error handler for routes that don't exist
app.use(error404NotFound);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong.');
});


app.listen(process.env.PORT || 3000);