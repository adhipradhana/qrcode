const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');

const vars = dotenv.config();
if (vars.error) {
  throw vars.error
}

const jwtKey = fs.readFileSync(process.env.JWT_PATH, 'utf8');

var authenticateAdmin = (req, res, next) => {
    console.log(req.cookies);
    let token = req.cookies.jwtToken || req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                return res.render('login.njk');
            } else {
                if (decoded.admin) {
                    next();
                } else {
                    return res.render('login.njk');
                }
            }
        });
    } else {
        return res.render('login.njk');
    }
}

module.exports = authenticateAdmin;