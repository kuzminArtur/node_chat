const { authByToken } = require('../../users/utils/tokenHandler');

const auth = async (wss, request, socket, head) => {
  let user;
  try {
    user = await authByToken(request);
  } catch (err) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request, user);
  });
};

module.exports = { auth };
