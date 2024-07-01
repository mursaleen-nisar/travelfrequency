import express from 'express';
const app = express();
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import adminModel from './models/adminModel.js';
import { createQuoteTable } from './models/getQuoteModel.js';
import { createTestimonialsTable } from './models/testimonialModel.js';

// Create db tables on application startup for first time
if(process.env.NODE_ENV === 'development') {
    adminModel.createAdminTable();
    createQuoteTable();
    createTestimonialsTable();
}

import indexRoute from './routes/index.js';
import cardsRoute from './routes/cardsRouter.js';
import adminRoute from './routes/adminRouter.js';
import error404NotFound from './middlewares/404Error.js';


app.set('view engine', 'ejs');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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