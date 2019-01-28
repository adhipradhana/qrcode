const router = require('express').Router();

const guestAPI = require('./guestController');
const eventAPI = require('./eventController');
const AdminAuth = require('../../middlewares/adminAuth');

router.use(AdminAuth);

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Admin service available"
    })
});
router.use('/guest', guestAPI);
router.use('/event', eventAPI);

module.exports = router;