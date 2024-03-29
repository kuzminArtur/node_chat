const router = require('express').Router();
const { getRooms, getRoom, createRoom } = require('./controllers/rooms');

router.route('/')
  .get(getRooms)
  .post(createRoom);
router.route('/:roomName')
  .get(getRoom);

module.exports = router;
