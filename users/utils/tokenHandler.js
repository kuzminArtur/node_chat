const jwt = require('jsonwebtoken');
const config = require('../../configs/appConfig');
const {TokenError} = require('../errorTypes/authErrors');

const generateToken = async (user) => {
    const payload = {
        user: user,
        token_type: 'access'
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: config.token_expire.access});
    payload.token_type = 'refresh';
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: config.token_expire.refresh});
    return {
        access: accessToken,
        refresh: refreshToken
    }
}

const verifyToken = async (req, token) => {
    const payload = jwt.verify(token, process.env.SECRET_KEY,);
    if (payload.token_type !== 'access') {
        throw new TokenError;
    }
    req.user = payload.user;
}

const generateByRefresh = async (token) => {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return generateToken(payload.user);
}

module.exports = {generateToken, verifyToken, generateByRefresh};