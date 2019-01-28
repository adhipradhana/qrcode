const router = require('express').Router();

const Guest = require('../../models/guest');

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Android service available"
    })
});

router.get('/guest', (req, res) => {
    let token = req.query.token;

    if (token) {
        Guest.findOne({ where: {token: token} })
        .then((guest) => {
            res.json({
                status: "success",
                data: guest
            })
        }).catch((err) => {
            res.json({
                status: "failed",
                message: err.message
            }); 
        });
    } else {
        res.json({
            status: "failed",
            message: "User token not given"
        });
    }
});

router.post('/guest', (req, res) => {
    let token = req.body.token;

    if (token) {
        Guest.findOne({ where: {token: token} })
        .then((guest) => {
            guest.update({
                attended: true
            }).then((guest) => {
                res.send({
                    status: "success",
                    message: `${guest.name} has attended!`
                });
            }).catch((err) => {
                res.send({
                    status: "failed",
                    message: "Failed to update guest"
                });
            });
        }).catch((err) => {
            res.json({
                status: "failed",
                message: err.message
            }); 
        });
    } else {
        res.json({
            status: "failed",
            message: "User token not given"
        });
    }
});

module.exports = router;