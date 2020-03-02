/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const Websocket = require('ws');
const path = require('path');
const wss = new Websocket.Server({ server });

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use('/', express.static(PUBLIC_DIR));

const users = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received:', message);
    const [type, uuid, beatIndex, notename] = message.split(':');
    if (users[uuid] === undefined) {
      users[uuid] = ws;
    }

    if (type === 'C') {
      const userIDs = Object.keys(users);
      userIDs.forEach((id) => {
        if (id !== uuid) {
          users[id].send(message);
        }
      });
    } else {
      console.log('New note entry', notename, beatIndex);
    }
  });
});

server.listen(PORT, () => {
  console.log('Server listening on port', 3000);
});
