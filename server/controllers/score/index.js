const edits = require('./edits');
const scoreCache = require('./scoreCache');

class Score {
  static async createNote(uuid, composition, pitch, measure, tick, duration) {
    const action = 'create';
    await edits.register(uuid, composition, action, pitch, measure, tick, duration);
    await scoreCache.update();
  }

  static async deleteNote(uuid, pitch, measure, tick) {
    const action = 'delete';
    await edits.register(uuid, action, pitch, measure, tick);
    await scoreCache.update();
  }

  static undo() {
    return Promise.all([edits.undo(), scoreCache.undo()]);
  }

  static get() {
    return scoreCache.get()
      .then((result) => result.score);
  }
}

module.exports = Score;
