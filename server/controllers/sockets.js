/* eslint-disable no-console */
const Websocket = require('ws');
const score = require('../models/score');
const session = require('../models/session');

let wss;

const messageRecieved = (msg, ws) => {
  if (msg === 'update') {
    session.notifyUpdate();
    return;
  }

  const [type, uuid, beatIndex, notename] = msg.split(':');
  if (type === 'register') {
    session.addUser(uuid, ws);
    return;
  }

  if (type === 'undo') {
    score.undo()
      .then(() => session.notifyUpdate())
      .catch((err) => console.log(err));
  }

  if (type === 'U' || type === 'H') { // Cursor messages
    session.authorMessage(uuid, msg);
    return;
  }

  if (type === 'C') { // Note create message
    score.createNote({ uuid, notename, beatIndex })
      .then(() => session.notifyUpdate())
      .catch((err) => console.log(err));
    return;
  }

  if (type === 'D') { // Note delete message
    score.deleteNote({ uuid, notename, beatIndex })
      .then(() => session.notifyUpdate())
      .catch((err) => console.log(err));
  }
};

const connected = (ws) => {
  console.log('Connected to websockets client');
  ws.on('message', (msg) => messageRecieved(msg, ws));
};

const init = (server) => {
  wss = new Websocket.Server({ server });

  wss.on('connection', (ws) => connected(ws));
};

module.exports = { init };
