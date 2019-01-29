const router = require('express').Router();

var pagesDirectory = __dirname + "/pages/";

router.get('/', (req, res) => {
    res.sendFile('login.html', { root: pagesDirectory });
});

module.exports = router;