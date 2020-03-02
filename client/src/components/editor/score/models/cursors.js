class Cursors {
  constructor() {
    this.users = {
      local: { note: null, beatIndex: null, color: 'blue' },
      remote: { note: null, beatIndex: null, color: 'red' },
    };
  }

  update(user, notename, beatIndex) {
    this.users[user].note = notename;
    this.users[user].beatIndex = beatIndex;
  }

  remove(user) {
    this.users[user].note = null;
    this.users[user].beatIndex = null;
  }
}

export default Cursors;
