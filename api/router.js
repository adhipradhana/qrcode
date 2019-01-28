const express = require('express');
const api = express.Router();

const androidAPI = require('./guestAPI')
const TokenAuth = require('../middlewares/tokenAuth');

api.use(TokenAuth);
api.use(androidAPI);

module.exports = api;