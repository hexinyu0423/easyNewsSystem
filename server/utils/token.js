const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const secret = 'hexinyu';
function getToken(payload, expiresIn) {
    return jwt.sign(payload, secret, {
        expiresIn
    })
}

function verifyToken() {
    return expressjwt({ secret, algorithms: ['HS256'] })
}

module.exports = { getToken, verifyToken };