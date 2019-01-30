const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// import api endpoint
const androidAPI = require('./android/router');
const adminAPI = require('./admin/controllers/router'); 
const api = require('express').Router();
const tokenAuth = require('./middlewares/tokenAuth');

// import admin page
const admin = require('./admin/views/index');

// port number
const PORT = 8000;

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// parse cookie
app.use(cookieParser());

app.get('/', (req, res) => {
    res.redirect('/admin');
});

app.use('/admin', admin);
app.use('/api', api);
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

api.use(tokenAuth);
api.use('/admin', adminAPI);
api.use('/android', androidAPI);

app.listen(PORT, "localhost", () => {
    console.log(`listening to port ${PORT}`);
});

