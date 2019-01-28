const router = require('express').Router();
const api = require('express').Router();

const guestAPI = require('./controllers/guestController');
const eventAPI = require('./controllers/eventController');
const login = require('./controllers/loginController');

const adminAuth = require('../middlewares/adminAuth');

router.use('/login', login);
router.use(api);

api.use(adminAuth);
api.use('/guest', guestAPI);
api.use('/event', eventAPI);

module.exports = router;