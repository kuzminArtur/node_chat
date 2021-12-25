const ws = require('ws');
const { messageEventHandler } = require('./messages');
const { auth } = require('./auth');
const { getExistingRooms } = require('../utils/rooms');

ws.Server.prototype.shouldHandle = (req) => {
  const roomsNames = getExistingRooms().map((room) => room.name);
  const regex = new RegExp(`^/(rooms)/(${roomsNames.join('|')})+$`);
  return regex.exec(req.url);
};

function getRoomName(req) {
  return req.url.split('/').at(-1);
}

const startWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({
    noServer: true,
  });

  wss.on('connection', (webSocket, request, user) => {
    user.room = getExistingRooms().find((room) => room.name === getRoomName(request));
    webSocket.room = user.room;
    webSocket.on('message', (message) => messageEventHandler(message, wss, user));
    // messageBroadcast(JSON.stringify({message: `${user.name} присоединился к чату!`}), wss, user);
  });

  server.on('upgrade', async (request, socket, head) => auth(wss, request, socket, head));
};

module.exports = { startWebSocketServer };
