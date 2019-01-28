const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// import api endpoint
const api = require('./controllers/router');
const view = require('./views/viewRouter');

// port number
const PORT = 8000;

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/view', view);
app.use('/api', api);

app.listen(PORT, "localhost", () => {
    console.log(`listening to port ${PORT}`);
});

