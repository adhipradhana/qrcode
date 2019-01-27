const router = require('express').Router();

const guestAPI = require('./guestController');
const eventAPI = require('./eventController');
const userAPI = require('./userController');

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Admin service available"
    })
});

router.use('/guest', guestAPI);
router.use('/event', eventAPI);
router.use('/user', userAPI);

module.exports = router;