const router = require('express').Router();

const User = require('../../models/user');

router.post('/', (req, res) => {
    let body = {
        username: req.body.username,
        password: req.body.password
    }

    User.login(body, (err, token) => {
        if (err) {
            return res.sendFile('login.html', { root: __dirname });
        }

        res.cookie("jwtToken", token, { maxAge: oneDay() });
        return res.render('guest.html', { root: __dirname });
    });
});

function oneDay() {
    return 24 * 3600 * 1000;
}

module.exports = router;
