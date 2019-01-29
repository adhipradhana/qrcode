const api = require('express').Router();

const guestAPI = require('./guestController');
const eventAPI = require('./eventController');
const loginAPI = require('./loginController');

const adminAuth = require('../../middlewares/adminAuth');

api.use(adminAuth);
api.use('/login', loginAPI);
api.use('/guest', guestAPI);
api.use('/event', eventAPI);

module.exports = api;