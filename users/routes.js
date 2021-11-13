const router = require('express').Router();
const { createUser, loginUser } = require('./controllers/users');

router.route('/signup').post(createUser);
router.route('/signin').post(loginUser);

module.exports = router;