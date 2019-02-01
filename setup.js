const db = require('./models/db');
const dotenv = require('dotenv');

const User = require('./models/user');
const Event = require('./models/event');
const Guest = require('./models/guest');

const vars = dotenv.config();
if (vars.error) {
  throw vars.error
}

db.sync({ force: true }).then(() => {
    User.createUser({
        username: 'admin',
        password: 'jokowi@2019',
        admin: true
    }, (err, token) => {
        if (err) {
            console.log(`Error : ${err}`);
        } else {
            console.log(`Token : ${token}`);
        }
    });
    User.createUser({
        username: 'android',
        password: 'galdin',
        admin: false
    }, (err, token) => {
        if (err) {
            console.log(`Error : ${err}`);
        } else {
            console.log(`Token : ${token}`);
        }
    });
    Event.create({
        name: "Gala Dinner",
        date: new Date("2019-02-09")
    });
    Guest.createGuest({
        name: "Yoo Jeongyeon",
        eventId: 1
    }, (err, data) => {
        if (err) {
            console.log(`Error : ${err}`);
        } else {
            console.log(`Token : ${data.token}`);
        }
    });
});
