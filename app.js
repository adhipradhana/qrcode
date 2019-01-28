const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

// import api endpoint
const api = require('./api/router');
const admin = require('./admin/router');

// port number
const PORT = 8000;

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// parse cookie
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

nunjucks.configure('admin/views/html', {
    autoescape: true,
    express: app
});

app.use('/admin', admin);
app.use('/api', api);

app.listen(PORT, "localhost", () => {
    console.log(`listening to port ${PORT}`);
});

