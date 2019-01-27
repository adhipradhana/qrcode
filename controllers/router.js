// import module
const express = require('express');
const api = express.Router();

const adminAPI = require('./admin/adminRouter');
const TokenAuth = require('../middlewares/tokenAuth');

api.use(TokenAuth);
api.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Service available"
    });
});
api.use('/admin', adminAPI);

module.exports = api;