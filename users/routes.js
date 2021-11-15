const router = require('express').Router();
const { createUser, loginUser, refreshToken } = require('./controllers/users');

router.route('/signup').post(createUser);
router.route('/signin').post(loginUser);
router.route('/refresh-token').post(refreshToken);

module.exports = router;