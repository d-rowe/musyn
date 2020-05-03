/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const Websocket = require('ws');
const score = require('../score');
const session = require('../../models/session');

class Messenger {
  constructor(server) {
    this.wss = new Websocket.Server({ server });

    this.wss.on('connection', (ws) => {
      console.log('Client connected to websocket server');
      ws.on('message', (message) => this.messageHandler(message, ws));
    });
  }

  messageHandler(messageString, ws) {
    const message = JSON.parse(messageString);
    const { type } = message;

    if (type === 'cursor') {
      session.send(message);
      return;
    }

    if (type === 'note') {
      this.noteHandler(message);
      return;
    }

    if (type === 'update') {
      session.update();
      return;
    }

    if (type === 'undo') {
      score.undo();
      session.update();
    }

    if (type === 'ping') {
      this.send(ws, 'pong');
      return;
    }

    if (type === 'register') {
      session.addUser(message.uuid, ws);
    }
  }

  async noteHandler(message) {
    const {
      uuid,
      payload: {
        pitch,
        measure,
        tick,
        duration,
      },
    } = message;

    if (message.action === 'create') {
      await score.createNote(uuid, pitch, measure, tick, duration);
    }

    if (message.action === 'delete') {
      await score.deleteNote(uuid, pitch, measure, tick);
    }

    session.update();
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
