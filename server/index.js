/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const Websocket = require('ws');
const path = require('path');
const score = require('./models/score');
// const wss = new Websocket.Server({ server });
const socket = require('./controllers/sockets');
socket.init(server);

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use('/', express.static(PUBLIC_DIR));

app.get('/api/score', (req, res) => {
  score.get()
    .then((scoreDat) => res.status(200).send(scoreDat))
    .catch((err) => res.status(500).send(err));
});

const users = {};

// TODO: split websockets to a seperate model
// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     const [type, uuid, beatIndex, notename] = message.split(':');
//     if (users[uuid] === undefined) {
//       users[uuid] = ws;
//     }

//     if (type === 'U' || type === 'H') {
//       const userIDs = Object.keys(users);
//       userIDs.forEach((id) => {
//         if (id !== uuid) {
//           users[id].send(message);
//         }
//         score.get();
//       });
//     } else if (type === 'D') {
//       score.deleteNote({ uuid, notename, beatIndex })
//         .then(() => console.log('Added note deletion entry'))
//         .catch((err) => console.log(err));
//     } else if (type === 'C') {
//       score.createNote({ uuid, notename, beatIndex })
//         .then(() => console.log('Added note creation entry'))
//         .catch((err) => console.log(err));
//     }
//   });
// });

server.listen(PORT, () => {
  console.log('Server listening on port', 3000);
});
