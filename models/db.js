const Sequelize = require('sequelize');
const dotenv = require('dotenv');

const vars = dotenv.config();
if (vars.error) {
  throw vars.error
}

const db = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'mysql'
});

module.exports = db;