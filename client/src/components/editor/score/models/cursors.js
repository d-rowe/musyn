import socket from './socket';
import view from '../views/score';

class Cursors {
  constructor() {
    this.uuid = Math.random().toString(36).substring(2, 15);
    this.users = {
      local: { note: null, beatIndex: null, color: 'rgba(51, 101, 138, 0.8)' },
      remote: { note: null, beatIndex: null, color: 'rgba(242, 100, 25, 0.8)' },
    };

    socket.on.cursorUpdate = (cursor) => {
      this.users.remote.note = cursor.notename;
      this.users.remote.beatIndex = cursor.beatIndex;
      view.rerender();
    };
  }

  update(user, notename, beatIndex) {
    this.users[user].note = notename;
    this.users[user].beatIndex = beatIndex;
    socket.send(`C:${this.uuid}:${beatIndex}:${notename}`);
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
