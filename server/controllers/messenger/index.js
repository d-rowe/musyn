/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const IO = require('socket.io');
const score = require('../score');


class Messenger {
  constructor(server) {
    const io = IO(server);
    io.on('connection', (socket) => {
      console.log('SocketIO client connected');

      socket.on('cursor', (msg) => {
        socket.broadcast.emit('cursor', msg);
      });

      socket.on('note', (msg) => {
        this.noteHandler(msg)
          .then(() => socket.broadcast.emit('update'));
      });

      socket.on('update', () => {
        socket.broadcast.emit('update');
      });

      socket.on('undo', () => {
        score.undo()
          .then(() => socket.emit('update'));
      });
    });
  }

  async noteHandler(msg) {
    const {
      pitch,
      measure,
      tick,
      duration,
    } = msg;

    // TODO: Reimpliment uuid
    if (msg.action === 'create') {
      await score.createNote('default', pitch, measure, tick, duration);
    }

    if (msg.action === 'delete') {
      await score.deleteNote('default', pitch, measure, tick);
    }
  }
}

module.exports = Messenger;
