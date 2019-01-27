const Sequelize = require('sequelize');
const db = require('./db');

const Event = db.define('event', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Event;