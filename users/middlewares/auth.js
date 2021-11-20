const {verifyToken} = require('../utils/tokenHandler');

const auth = async (err, req, res, next) => {
    if (err) {
        return next(err);
    }
    const url = req.url;
    const routesWithoutAuth = ['signup', 'signin', 'refresh-token']; // Эндпоинты для которых не требуется проверки токена
    const regExp = new RegExp(`^/(${routesWithoutAuth.join('|')})/?$`);
    if (regExp.test(url)) {
        return next();
    }
    const {authorization} = req.headers;
    const token = authorization && authorization.replace('Bearer ', '');
    try {
        await verifyToken(req, token);
    } catch (err) {
        return next(err);
    }
    return next();
}

module.exports = auth;