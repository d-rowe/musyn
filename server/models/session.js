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
        const messageString = JSON.stringify(message);
        this.users[uuid].send(messageString);
      }
    });
  }

  update() {
    this.send({ type: 'update' });
  }
}

module.exports = new Session();
