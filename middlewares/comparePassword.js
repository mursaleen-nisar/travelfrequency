module.exports.comparePassword = (req, res, next) => {
    let { password, confirmPassword } = req.body;
    if(password !== confirmPassword) {
        res.redirect('/admin/register');
    } else {
        next();
    }
}