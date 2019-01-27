const router = require('express').Router();

const User = require('../../models/user');

router.post('/create', (req, res) => {
    let body = {
        username: req.body.username,
        password: req.body.password
    }

    User.createUser(body, (err, token) => {
        if (err) {
            return res.json({
                status: "failed",
                message: err.message
            });
        }

        return res.json({
            status: "success",
            message: "User created sucessfully",
            token: token
        });
    });
});

router.post('/login', (req, res) => {
    let body = {
        username: req.body.username,
        password: req.body.password
    }

    User.login(body, (err, token) => {
        if (err) {
            return res.json({
                status: "failed",
                message: err.message
            });
        }

        return res.json({
            status: "success",
            message: "Login successfull",
            token: token
        });
    });
});

module.exports = router;



