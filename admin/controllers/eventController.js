const router = require('express').Router();

const Event = require('../../models/event');

router.post('/create', (req, res) => {
    let body = {
        name: req.body.name,
        date: req.body.date
    }

    Event.create({
        name: body.name,
        date: body.date
    }).then((event) => {
        return res.json({
            success: true,
            message: "Event data created",
            data: event
        });
    }).catch((err) => {
        return res.json({
            success: false,
            message: err.message
        })
    });
});

router.post('/update', (req, res) => {
    let body = {
        name: req.body.name,
        id: req.body.id
    }

    Event.findOne({ where: {id : body.id}})
    .then((event) => {
        if (!event) {
            return res.json({
                success: false,
                message: "Event not found"
            });
        }

        event.update({
            name: body.name
        }).then((event) => {
            return res.json({
                success: true,
                message: "Event successfully updated",
                data: event
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: err.message
            });
        });
    }).catch((err) => {
        return res.json({
            success: false,
            message: err.message
        });
    }); 
});

router.post('/delete', (req, res) => {
    let body = {
        id: req.body.id
    }

    Event.findOne({ where: {id : body.id}})
    .then((event) => {
        if (!event) {
            return res.json({
                success: false,
                message: "Event not found"
            })
        }

        event.destroy().
        then(() => {
            return res.json({
                success: true,
                message: "Event successfully deleted"
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: err.message
            });
        });
    }).catch((err) => {
        return res.json({
            success: false,
            message: err.message
        });
    }); 
});

router.get('/list', (req, res) => {
    Event.findAll()
    .then((events) => {
        return res.json({
            success: true,
            data: events
        })
    }).catch((err) => {
        return res.json({
            success: false,
            message: err.message
        });
    });
});

module.exports = router;