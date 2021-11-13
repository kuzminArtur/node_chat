const jwt = require('jsonwebtoken');
const config = require('../../configs/appConfig');


const generateToken = async (payload) => {
    const accesToken = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: config.token_expire.access });
    const refreshToken = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: config.token_expire.refresh });
    return {
        access: accesToken,
        refresh: refreshToken
    }
}

const verifyToken = async (token) => {
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    if (!payload.hasOwnProperty('name'))
        return null;
    return payload.name;
}

module.exports = { generateToken, verifyToken };