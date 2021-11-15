const { verifyToken } = require('../utils/tokenHandler');


const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    let user;
    if (!authorization)
        return next();
    const token = authorization.replace('Bearer ', '');
    try {
        user = await verifyToken(req, token);
    } catch (err) {
        next(err);
    }

    // if (user)
    //     req.user = user;
    return next();
}

module.exports = auth;