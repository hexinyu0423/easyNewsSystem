const jwt = require('jsonwebtoken');
const miyao = 'hexinyu';
function getToken(payload, expiresIn) {
    return jwt.sign(payload, miyao, {
        expiresIn
    })
}

module.exports = getToken;