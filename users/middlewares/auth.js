const { authByToken } = require('../utils/tokenHandler');
const { TokenError } = require('../errorTypes/authErrors');

const auth = async (req, res, next) => {
  const { url } = req;
  const routesWithoutAuth = ['signup', 'signin', 'refresh-token']; // Эндпоинты для которых не требуется проверка токена
  const regExp = new RegExp(`^/(${routesWithoutAuth.join('|')})/?$`);
  if (regExp.test(url)) {
    return next();
  }
  try {
    req.user = await authByToken(req);
  } catch (err) {
    return next(new TokenError());
  }
  return next();
};

module.exports = auth;
