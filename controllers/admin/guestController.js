const router = require('express').Router();

const Guest = require('../../models/guest');

router.post('/create', (req, res) => {
    let body = {
        name: req.body.name,
        eventId: req.body.eventId
    }

    Guest.createGuest(body, (err, data) => {
        if (err) {
            return res.json({
                status: "failed",
                message: err.message
            });
        }

        return res.json({
            status: "success",
            message: "Guest successfully created",
            data: data
        })
    });
});

router.post('/update', (req, res) => {
    let body = {
        id: req.body.id,
        name: req.body.name,
        eventId: req.body.eventId
    }

    Guest.updateGuest(body, (err, data) => {
        if (err) {
            return res.json({
                status: "failed",
                message: err.message
            });
        }

        return res.json({
            status: "success",
            message: "Guest data updated",
            data: data
        })
    }); 
});

router.post('/delete', (req, res) => {
    let body = {
        id: req.body.id
    }

    Guest.deleteGuest(body, (err) => {
        if (err) {
            return res.json({
                status: "failed",
                message: err.message
            });
        }

        return res.json({
            status: "success",
            message: "Guest data deleted"
        });
    });
});

router.get('/list', (req, res) => {
    let eventId = req.query.eventId;

    if (!eventId) {
        Guest.findAll()
        .then((guests) => {
            return res.json({
                status: "success",
                data: guests
            });
        }).catch((err) => {
            return res.json({
                status: "failed",
                message: err.message
            })
        });
    } else {
        Guest.findAll({ where: {eventId: eventId}})
        .then((guests) => {
            return res.json({
                status: "success",
                data: guests
            });
        }).catch((err) => {
            return res.json({
                status: "failed",
                message: err.message
            })
        });
    }
});

module.exports = router;