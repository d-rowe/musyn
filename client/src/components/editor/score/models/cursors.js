/* eslint-disable import/no-named-as-default-member */
import socket from './socket';
import view from '../views/score';

class Cursors {
  constructor() {
    // TODO: update to UUIDs, handle n users
    this.users = {
      local: { note: null, beatIndex: null, color: 'rgba(51, 101, 138, 0.8)' },
      remote: { note: null, beatIndex: null, color: 'rgba(242, 100, 25, 0.8)' },
    };

    // TODO: use this.update()
    socket.on.cursorUpdate = (cursor) => {
      this.users.remote.note = cursor.notename;
      this.users.remote.beatIndex = cursor.beatIndex;
      view.rerender();
    };

    // TODO: use this.remove()
    socket.on.cursorRemove = () => {
      this.users.remote.note = null;
      this.users.remote.beatIndex = null;
      view.rerender();
    };
  }

  // TODO: only send if local user
  update(user, notename, beatIndex) {
    this.users[user].note = notename;
    this.users[user].beatIndex = beatIndex;
    socket.sendCursorUpdate(notename, beatIndex);
  }

  // TODO: only send if local user
  remove(user) {
    this.users[user].note = null;
    this.users[user].beatIndex = null;
    socket.sendCursorRemove();
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
