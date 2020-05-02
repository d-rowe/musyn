const edits = require('./edits');
const cache = require('./cache');


class Score {
  static async createNote(uuid, pitch, measure, tick, duration) {
    const action = 'create';
    await edits.register(uuid, action, pitch, measure, tick, duration);
    await cache.update();
  }

  static async deleteNote(uuid, pitch, measure, tick) {
    const action = 'delete';
    await edits.register(uuid, action, pitch, measure, tick);
    await cache.update();
  }

  static undo() {
    return Promise.all([edits.undo(), cache.undo()]);
  }

  static get() {
    return cache.get()
      .then((result) => result.score);
  }
}

module.exports = Score;
