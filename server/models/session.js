const users = {};

const addUser = (uuid, connection) => {
  users[uuid] = { connection };
};

const removeUser = (uuid) => {
  delete users[uuid];
};

const authorMessage = (authorUUID, msg) => {
  const uuids = Object.keys(users);

  uuids.forEach((uuid) => {
    if (uuid !== authorUUID) {
      users[uuid].connection.send(msg);
    }
  });
};

const notifyUpdate = () => {
  const uuids = Object.keys(users);

  uuids.forEach((uuid) => {
    users[uuid].connection.send('update');
  });
};

module.exports = {
  addUser,
  removeUser,
  authorMessage,
  notifyUpdate,
};
