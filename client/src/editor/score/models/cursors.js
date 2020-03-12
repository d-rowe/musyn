import socket from './socket';
import view from '../views/score';

// TODO: Refactor to singleton for global document cursor data
class Cursors {
  constructor() {
    // TODO: update to UUIDs, handle n users
    this.users = {
      local: { note: null, tick: null, color: 'rgba(51, 101, 138, 0.8)' },
      remote: { note: null, tick: null, color: 'rgba(242, 100, 25, 0.8)' },
    };

    // TODO: use this.update()
    socket.on.cursorUpdate = (cursor) => {
      this.users.remote.note = cursor.notename;
      this.users.remote.tick = cursor.tick;
      view.rerender();
    };

    // TODO: use this.remove()
    socket.on.cursorRemove = () => {
      this.users.remote.note = null;
      this.users.remote.tick = null;
      view.rerender();
    };
  }

  // TODO: only send if local user
  update(user, notename, tick) {
    this.users[user].note = notename;
    this.users[user].tick = tick;
    socket.sendCursorUpdate(notename, tick);
  }

  // TODO: only send if local user
  remove(user) {
    this.users[user].note = null;
    this.users[user].tick = null;
    socket.sendCursorRemove();
  }

  beatFormat() {
    const userIds = Object.keys(this.users);

    const output = {};

    userIds.forEach((user) => {
      const { note, color, tick } = this.users[user];

      if (note === null) return;

      const userCursor = { user, note, color };

      if (output[tick] === undefined) {
        output[tick] = [userCursor];
      } else {
        output[tick].push(userCursor);
      }
    });

    return output;
  }
}

export default Cursors;
