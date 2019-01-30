const api = require('express').Router();

const guestAPI = require('./guestController');
const eventAPI = require('./eventController');

const adminAuth = require('../../middlewares/adminAuth');

api.use(adminAuth);
api.use('/guest', guestAPI);
api.use('/event', eventAPI);

module.exports = api;