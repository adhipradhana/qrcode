const router = require('express').Router();

const Event = require('../../models/event');

router.get('/', (req, res) => {
    res.render('event.njk');
});

router.post('/create', (req, res) => {
    let body = {
        name: req.body.name
    }

    Event.create({
        name: body.name
    }).then((event) => {
        return res.json({
            status: "success",
            message: "Event data created",
            data: event
        });
    }).catch((err) => {
        return res.json({
            status: "failed",
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
                status: "failed",
                message: "Event not found"
            });
        }

        event.update({
            name: body.name
        }).then((event) => {
            return res.json({
                status: "success",
                message: "Event successfully updated",
                data: event
            });
        }).catch((err) => {
            return res.json({
                status: "failed",
                message: err.message
            });
        });
    }).catch((err) => {
        return res.json({
            status: "failed",
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
                status: "failed",
                message: "Event not found"
            })
        }

        event.destroy().
        then(() => {
            return res.json({
                status: "success",
                message: "Event successfully deleted"
            });
        }).catch((err) => {
            return res.json({
                status: "failed",
                message: err.message
            });
        });
    }).catch((err) => {
        return res.json({
            status: "failed",
            message: err.message
        });
    }); 
});

router.get('/list', (req, res) => {
    Event.findAll()
    .then((events) => {
        return res.json({
            status: "success",
            data: events
        })
    }).catch((err) => {
        return res.json({
            status: "failed",
            message: err.message
        });
    });
});

module.exports = router;