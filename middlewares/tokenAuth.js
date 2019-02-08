const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');

const vars = dotenv.config();
if (vars.error) {
  throw vars.error
}

const jwtKey = fs.readFileSync(process.env.JWT_PATH, 'utf8');

var authenticateToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.cookies.jwtToken;
    
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

module.exports = authenticateToken;
