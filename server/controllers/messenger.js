/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const Websocket = require('ws');
const score = require('../models/score');
const session = require('../models/session');


class Messenger {
  constructor(server) {
    this.wss = new Websocket.Server({ server });

    this.wss.on('connection', (ws) => {
      console.log('Client connected to websocket server');
      ws.on('message', (message) => this.parse(message, ws));
    });
  }

  parse(messageString, ws) {
    const message = JSON.parse(messageString);
    const { type } = message;

    if (type === 'cursor') {
      this.cursorHandler(message);
      return;
    }

    if (type === 'note') {
      this.noteHandler(message);
    }

    if (type === 'ping') {
      this.send(ws, 'pong');
    }
  }

  cursorHandler(message) {
    console.log(message);
  }

  noteHandler(message) {

  }

  send(ws, type, action, payload) {
    const message = { type };

    if (action) {
      message.action = action;
    }

    if (payload) {
      message.payload = payload;
    }

    ws.send(JSON.stringify(message));
  }
}

module.exports = Messenger;
