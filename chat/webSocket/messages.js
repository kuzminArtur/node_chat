const ws = require('ws');
const { saveMessage } = require('../controllers/messages');

function sendMessageToRoomUsers(messageObj, wss, room) {
  wss.clients.forEach((client) => {
    if (client.room === room && client.readyState === ws.OPEN) {
      client.send(JSON.stringify(messageObj));
    }
  });
}

function sendUserMessage(message, wss, user) {
  const messageObj = { message, user: user.name };
  sendMessageToRoomUsers(messageObj, wss, user.room);
}

function notifyJoin(wss, user) {
  const messageObj = {
    notification: `${user.name} вошел в комнату`,
  };
  sendMessageToRoomUsers(messageObj, wss, user.room);
}

function messageEventHandler(data, wss, user) {
  const messageObj = JSON.parse(data);
  // eslint-disable-next-line no-prototype-builtins
  if (messageObj.hasOwnProperty('message')) {
    saveMessage(messageObj.message, user, user.room);
    sendUserMessage(messageObj.message, wss, user);
  }
}

module.exports = { messageEventHandler, notifyJoin };
