module.exports = (req, res, next) => {
    res.status(404).render('page-not-found', { title: 'Page not found', page: 'page-not-found'});
};