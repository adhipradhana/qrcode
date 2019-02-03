const router = require('express').Router();

const User = require('../../models/user');

router.post('/login', (req, res) => {
    let body = {
        username: req.body.username,
        password: req.body.password
    }

    User.login(body, (err, token) => {
        if (err) {
            return res.redirect('/');
        }

        res.cookie("jwtToken", token, { maxAge: oneDay() });
        res.redirect('/admin/dashboard');
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie("jwtToken");

    // redirect to home page
    res.redirect('/');
});

function oneDay() {
    return 24 * 3600 * 1000;
}

module.exports = router;
