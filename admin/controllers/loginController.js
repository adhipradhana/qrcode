const router = require('express').Router();

const User = require('../../models/user');

router.post('/', (req, res) => {
    let body = {
        username: req.body.username,
        password: req.body.password
    }

    User.login(body, (err, token) => {
        if (err) {
            return res.json({
                status: "failed",
                message: err.message
            })
        }

        return res.json({
            status: "success",
            token: token
        })
    });
});

function oneDay() {
    return 24 * 3600 * 1000;
}

module.exports = router;
