const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');

const vars = dotenv.config();
if (vars.error) {
  throw vars.error
}

const jwtKey = fs.readFileSync(process.env.JWT_PATH, 'utf8');

var authenticateToken = (req, res, next) => {
    let token = req.cookies.jwtToken;
    
    if (token) {     
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                return res.redirect('/');
            } else {
                if (!decoded.admin) {
                    return res.redirect('/');
                }

                next();
            }
        });
    } else {
        return res.redirect('/');
    }
}

module.exports = authenticateToken;
