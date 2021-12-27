const auth = require('./middlewares/auth');
const { authByToken } = require('./utils/tokenHandler');
const userRouter = require('./routes');

module.exports = { auth, userRouter, authByToken };
