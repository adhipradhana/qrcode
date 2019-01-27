const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');

const db = require('./db');
var generateToken = require('../middlewares/tokenAuth').generateToken;

const User = db.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  admin: { type: Sequelize.BOOLEAN, allowNull: false }
});

const vars = dotenv.config();
if (vars.error) {
  throw vars.error
}

const jwtKey = fs.readFileSync(process.env.JWT_PATH, 'utf8');

var generateToken = (user) => {
    let payload = {
        username: user.username,
        admin: user.admin
    }

    let token = jwt.sign(
        payload,
        jwtKey
    );

    return token;
}

User.createUser = (data, callback) => {
    bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) {
            return callback(err);
        }

        User.create({
            username: data.username,
            password: hash,
            admin: data.admin
        }).then((user) => {
            let token = generateToken(user);
            
            return callback(null, token);
        }).catch((err) => {
            return callback(err);
        });
    });
};

User.login = (data, callback) => {
    User.findOne({
        where: {username: data.username}
    }).then((user) => {
        if (!user) {
            return callback({
                message: "User not found"
            });
        }

        bcrypt.compare(data.password, user.password, (err, res) => {
            if (err) {
                return callback(err);
            }

            if (res) {
                let token = generateToken(user);
                
                return callback(null, token);
            } else {
                return callback({
                    message: "Password don't match"
                });
            }
        });
    }).catch((err) => {
        return callback(err);
    });
}

module.exports = User;
