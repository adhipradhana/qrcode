const router = require('express').Router();

const Guest = require('../models/guest');
const Event = require('../models/event');

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Android service available"
    })
});

router.get('/guest', (req, res) => {
    let token = req.query.token;

    if (token) {
        Guest.findOne({ where: {token: token} })
        .then((guest) => {
            Event.findOne({ where: {id: guest.eventId}})
            .then((event) => {
                res.json({
                    success: true,
                    data: {
                        name: guest.name,
                        event: event.name
                    }
                });
            }).catch((err) => {
                res.json({
                    success: false,
                    message: "Event not found"
                }); 
            });
        }).catch((err) => {
            res.json({
                success: false,
                message: "Guest not found"
            }); 
        });
    } else {
        res.json({
            success: false,
            message: "Guest token not given"
        });
    }
});

router.post('/guest', (req, res) => {
    let token = req.body.token;

    if (token) {
        Guest.findOne({ where: {token: token} })
        .then((guest) => {
            if (guest.attended) {
                res.json({
                    success: false,
                    message: `Error : ${guest.name} already attended`
                });
            } else {
                guest.update({
                    attended: true
                }).then((guest) => {
                    res.send({
                        success: true,
                        message: `Welcome ${guest.name}`
                    });
                }).catch((err) => {
                    res.send({
                        success: false,
                        message: "Failed to update guest"
                    });
                });
            }
        }).catch((err) => {
            res.json({
                success: false,
                message: "Guest not found"
            }); 
        });
    } else {
        res.json({
            success: false,
            message: "Guest token not given"
        });
    }
});

module.exports = router;