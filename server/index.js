/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const Websocket = require('ws');
const path = require('path');
const score = require('./models/score');
const wss = new Websocket.Server({ server });

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use('/', express.static(PUBLIC_DIR));

const users = {};

// TODO: split websockets to a seperate model
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const [type, uuid, beatIndex, notename] = message.split(':');
    if (users[uuid] === undefined) {
      users[uuid] = ws;
    }

    if (type === 'U' || type === 'H') {
      const userIDs = Object.keys(users);
      userIDs.forEach((id) => {
        if (id !== uuid) {
          users[id].send(message);
        }
      });
    } else if (type === 'D') {
      console.log(
        `Delete ${notename} on beat ${beatIndex + 1}`,
      );
    } else if (type === 'C') {
      console.log(
        `Create ${notename} on beat ${beatIndex + 1}`,
      );
      score.addNote({ uuid, notename, beatIndex })
        .then(() => console.log('Added note entry'))
        .catch((err) => console.log(err));
    }
  });
});

server.listen(PORT, () => {
  console.log('Server listening on port', 3000);
});
