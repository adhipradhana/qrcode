const express = require('express');
const api = express.Router();

const adminAPI = require('./admin/adminRouter');
const androidAPI = require('./android/guest')
const TokenAuth = require('../middlewares/tokenAuth');

api.use(TokenAuth);
api.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Service available"
    });
});
api.use('/android', androidAPI);
api.use('/admin', adminAPI);

module.exports = api;