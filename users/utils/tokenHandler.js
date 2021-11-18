const jwt = require('jsonwebtoken');
const config = require('../../configs/appConfig');


const generateToken = async (user) => {
    const payload = {
        user: user,
        token_type: 'access'
    };
    const accesToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: config.token_expire.access});
    payload.token_type = 'refresh';
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: config.token_expire.refresh});
    return {
        access: accesToken,
        refresh: refreshToken
    }
}

const verifyToken = async (req, token) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY,);
        if (payload.token_type !== 'access') {
            throw new Error('Invalid tilen');
        }
        req.user = payload.user;
    } catch (err) {
        next(new Error(err)); //TODO: добавить обработчик ошибок
    }
}

const generateByRefresh = async (token) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        return generateToken(payload.user);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {generateToken, verifyToken, generateByRefresh};