const {authByToken} = require('../utils/tokenHandler');

const auth = async (req, res, next) => {
    const url = req.url;
    const routesWithoutAuth = ['signup', 'signin', 'refresh-token']; // Эндпоинты для которых не требуется проверка токена
    const regExp = new RegExp(`^/(${routesWithoutAuth.join('|')})/?$`);
    if (regExp.test(url)) {
        return next();
    }
    try {
        req.user = await authByToken(req);
    } catch (err) {
        return next(err);
    }
    return next();
}

module.exports = auth;