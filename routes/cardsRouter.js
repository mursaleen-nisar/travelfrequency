import express from 'express';
const router = express.Router();

router.get('/kashmirtour-1-info', (req, res) => {
    res.render('card-1-info', { title: 'Package 1 Information', page: 'card-1-info' });
});

router.get('/kashmirtour-2-info', (req, res) => {
    res.render('card-2-info', { title: 'Package 2 Information', page: 'card-2-info' });
});

router.get('/kashmirtour-3-info', (req, res) => {
    res.render('card-3-info', { title: 'Package 3 Information', page: 'card-3-info' });
});

export default router;