const ws = require('ws');
const { saveMessage } = require('../controllers/messages');

function sendUserMessage(message, wss, user) {
  const messageObj = { message, user: user.name };
  wss.clients.forEach((client) => {
    if (client.room === user.room && client.readyState === ws.OPEN) {
      client.send(JSON.stringify(messageObj));
    }
  });
}

function messageEventHandler(data, wss, user) {
  const messageObj = JSON.parse(data);
  // eslint-disable-next-line no-prototype-builtins
  if (messageObj.hasOwnProperty('message')) {
    saveMessage(messageObj.message, user, user.room);
    sendUserMessage(messageObj.message, wss, user);
  }
}

module.exports = { messageEventHandler };
