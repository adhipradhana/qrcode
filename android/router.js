const api = require('express').Router();

const guestAPI = require('./guestAPI');

api.use(guestAPI);

module.exports = api;