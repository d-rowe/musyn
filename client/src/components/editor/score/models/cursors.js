class Cursors {
  constructor() {
    this.users = {
      local: { note: null, beatIndex: null, color: 'rgba(52, 73, 94, 0.8)' },
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
