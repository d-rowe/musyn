const socketIO = require('socket.io');
const score = require('../entity/score');

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

module.exports = (server) => {
  const io = socketIO.listen(server);

  io.on('connection', (socket) => {
    const { composition } = socket.handshake.query;
    if (composition) {
      socket.join(composition);
    }

    const sendToRoom = (type, msg) => {
      socket.to(composition).emit(type, msg);
    };

    const sendToRoomInclude = (type, msg) => {
      io.in(composition).emit(type, msg);
    };

    socket.on('cursor', (msg) => {
      sendToRoom('cursor', msg);
    });

    socket.on('note', (msg) => {
      noteHandler(msg)
        .then(() => sendToRoom('update'));
    });

    socket.on('update', () => {
      sendToRoom('update');
    });

    socket.on('undo', () => {
      score.undo(composition)
        .then(() => sendToRoomInclude('update'));
    });

    socket.on('rename', (msg) => {
      sendToRoom('rename', msg);
    });
  });
};
