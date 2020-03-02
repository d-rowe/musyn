class Cursors {
  constructor() {
    this.users = {
      local: { note: null, beatIndex: null, color: 'rgba(51, 101, 138, 0.8)' },
      remote: { note: null, beatIndex: null, color: 'rgba(242, 100, 25, 0.8)' },
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

  beatFormat() {
    const userIds = Object.keys(this.users);

    const output = {};

    userIds.forEach((user) => {
      const { note, color, beatIndex } = this.users[user];

      if (note === null) return;

      const userCursor = { user, note, color };

      if (output[beatIndex] === undefined) {
        output[beatIndex] = [userCursor];
      } else {
        output[beatIndex].push(userCursor);
      }
    });

    return output;
  }
}

export default Cursors;
