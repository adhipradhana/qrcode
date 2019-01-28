const router = require('express').Router();

const User = require('../../models/user');

router.get('/', (req, res) => {
    res.render('login.njk');
});

router.post('/', (req, res) => {
    let body = {
        username: req.body.username,
        password: req.body.password
    }

    User.login(body, (err, token) => {
        if (err) {
            return res.render('login.njk');
        }

        res.cookie("jwtToken", token, { maxAge: oneDay() });
        return res.render('guest.njk');
    });
});

function oneDay() {
    return 24 * 3600 * 1000;
}

module.exports = router;
