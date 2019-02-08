const router = require('express').Router();
const fs = require('fs');
const zipFolder = require('zip-a-folder');

const Guest = require('../../models/guest');

router.post('/create', (req, res) => {
    let body = {
        name: req.body.name,
        eventId: req.body.eventId
    }

    Guest.findOne({ where: { name: body.name,eventId: body.eventId}})
    .then((guest) => {
        if (guest) {
            return res.json({
                success: false,
                message: "User has already been created"
            });
        }

        Guest.createGuest(body, (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err.message
                });
            }
    
            return res.json({
                success: true,
                message: "Guest successfully created",
                data: data
            })
        });
    }).catch((err) => {
        return res.json({
            success: false,
            message: "Internal error"
        });
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
                success: false,
                message: err.message
            });
        }

        return res.json({
            success: true,
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
                success: false,
                message: err.message
            });
        }

        return res.json({
            success: true,
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
                success: true,
                data: guests
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: err.message
            })
        });
    } else {
        Guest.findAll({ where: {eventId: eventId}})
        .then((guests) => {
            return res.json({
                success: true,
                data: guests
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: err.message
            });
        });
    }
});

router.get('/download', (req, res) => {
    zipFolder.zipFolder(__dirname + '/../../files', __dirname + '/../zip/pdf.zip', (err) => {
        if (err) {
            return res.json({
                success: false,
                message: "Error : failed to zip file"
            });
        }

        return res.download(__dirname + '/../zip/pdf.zip');
    });
});

module.exports = router;