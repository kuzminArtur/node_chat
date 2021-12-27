const jwt = require('jsonwebtoken');
const config = require('../../configs/appConfig');
const { TokenError } = require('../errorTypes/authErrors');
const { getUser } = require('./getUser');

const generateToken = async (user) => {
  const payload = {
    user,
    token_type: 'access',
  };
  const expireAccess = config.token_expire.access;
  const expireRefresh = config.token_expire.refresh;

  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expireAccess });
  payload.token_type = 'refresh';
  const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expireRefresh });
  return {
    access: accessToken,
    refresh: refreshToken,
  };
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.token_type !== 'access') {
    throw new TokenError();
  }
  return getUser(payload.user);
};

const authByToken = async (req) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.replace('Bearer ', '');
  return verifyToken(token);
};

const generateByRefresh = async (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  return generateToken(payload.user);
};

module.exports = {
  generateToken, verifyToken, generateByRefresh, authByToken,
};
