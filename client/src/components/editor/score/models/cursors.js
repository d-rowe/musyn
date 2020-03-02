class Cursors {
  constructor() {
    this.users = {
      local: { note: null, color: 'blue' },
      remote: { note: null, color: 'red' },
    };
  }

  update(user, notename) {
    this.users[user].note = notename;
  }

  remove(user) {
    this.users[user].note = null;
  }
}

export default Cursors;
