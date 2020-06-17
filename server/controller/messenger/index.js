const score = require('../../entity');


const noteHandler = async (msg) => {
  const {
    uuid,
    pitch,
    measure,
    tick,
    duration,
    composition,
  } = msg;

  if (msg.action === 'create') {
    await score.createNote(uuid, composition, pitch, measure, tick, duration);
  } else if (msg.action === 'delete') {
    await score.deleteNote(uuid, pitch, measure, tick);
  }
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('cursor', (msg) => {
      socket.broadcast.emit('cursor', msg);
    });

    socket.on('note', (msg) => {
      noteHandler(msg)
        .then(() => io.emit('update'));
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
