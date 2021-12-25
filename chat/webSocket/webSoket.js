const ws = require('ws');
const { messageEventHandler, notifyJoin } = require('./messages');
const { auth } = require('./auth');
const { getExistingRooms, getRoomFromReq } = require('../utils/rooms');

ws.Server.prototype.shouldHandle = (req) => {
  const roomsNames = getExistingRooms().map((room) => room.name);
  const regex = new RegExp(`^/(rooms)/(${roomsNames.join('|')})+$`);
  return regex.exec(req.url);
};

const startWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({
    noServer: true,
  });

  wss.on('connection', (webSocket, request, user) => {
    user.room = getRoomFromReq(request);
    webSocket.room = user.room;
    notifyJoin(wss, user);
    webSocket.on('message', (message) => messageEventHandler(message, wss, user));
  });

  server.on('upgrade', async (request, socket, head) => auth(wss, request, socket, head));
};

module.exports = { startWebSocketServer };
