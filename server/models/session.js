class Session {
  constructor() {
    this.users = {};
  }

  addUser(uuid, ws) {
    this.users[uuid] = ws;
  }

  removeUser(uuid) {
    if (this.users[uuid] !== undefined) {
      delete this.users[uuid];
    }
  }

  send(message) {
    const uuids = Object.keys(this.users);

    uuids.forEach((uuid) => {
      if (uuid !== message.uuid) {
        this.users[uuid].connection.send(message);
      }
    });
  }

  update() {
    const uuids = Object.keys(this.users);

    uuids.forEach((uuid) => {
      this.users[uuid].connection.send('update');
    });
  }
}

module.exports = new Session();
