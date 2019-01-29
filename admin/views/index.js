const router = require('express').Router();
const authRouter = require('express').Router();

const pageAuth = require('../../middlewares/pageAuth');

var pagesDirectory = __dirname + "/pages/";

router.get('/', (req, res) => {
    res.sendFile('login.html', { root: pagesDirectory });
});

router.use(authRouter);
authRouter.use(pageAuth);

authRouter.get('/dashboard', (req, res) => {
    res.sendFile('dashboard.html', { root: pagesDirectory});
});

authRouter.get('/guest', (req, res) => {
    res.sendFile('guest.html', { root: pagesDirectory});
});

authRouter.get('/event', (req, res) => {
    res.sendFile('event.html', { root: pagesDirectory});
});

module.exports = router;