const socketIO = require('socket.io');
const score = require('../score');


const noteHandler = async (msg) => {
  const {
    pitch,
    measure,
    tick,
    duration,
  } = msg;

  // TODO: Reimpliment uuid
  if (msg.action === 'create') {
    await score.createNote('default', pitch, measure, tick, duration);
  } else if (msg.action === 'delete') {
    await score.deleteNote('default', pitch, measure, tick);
  }
};

module.exports = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('SocketIO client connected');

    socket.on('cursor', (msg) => {
      socket.broadcast.emit('cursor', msg);
    });

    socket.on('note', (msg) => {
      noteHandler(msg)
        .then(() => socket.broadcast.emit('update'));
    });

    socket.on('update', () => {
      socket.broadcast.emit('update');
    });

    socket.on('undo', () => {
      score.undo()
        .then(() => io.emit('update'));
    });
  });
};
